import rp from 'request-promise';

function AbortError(message) {
  this.name = 'AbortError';
  this.message = message || 'Sequence was purposely aborted.';
  this.stack = (new Error()).stack;
}
AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;

const isString = value => (typeof value === 'string');
const escapeRegEx = value => value.replace(/[-[\]{}()*+?.\\^$|]/g, '\\$&');

class EmailSpy {
  constructor(domain, callback = () => null, crawlDelay = 100, maximumEmails = 100) {
    this.active = true;
    this.callback = callback;
    this.crawlDelay = crawlDelay;
    this.domain = domain;
    this.maximumEmails = maximumEmails;

    this.start();
  }

  start() {
    this.emails = [];

    return this.getFirstUrl()
      .then(url => this.abortIfInactive(url))
      .then(url => this.processAllPages(url))
      .catch(AbortError)
      .catch(console.error)
      .then(() => {
        this.active = false;
        this.callback();
      });
  }

  abort() {
    this.active = false;
    this.callback = () => null;
  }

  abortIfInactive(value) {
    if (!this.active) {
      this.callback();
      throw new AbortError();
    }
    return Promise.resolve(value);
  }

  delay(value) {
    return new Promise((resolve) => {
      if (this.crawlDelay) {
        setTimeout(() => resolve(value), this.crawlDelay);
      } else {
        resolve(value);
      }
    });
  }

  processAllPages(url) {
    if (!url) {
      return Promise.resolve();
    }

    return this.processPage(url)
      .then(nextUrl => (
        this.abortIfInactive()
          .then(() => this.delay())
          .then(() => this.abortIfInactive())
          .then(() => this.processAllPages(nextUrl))
      ));
  }

  processPage(url) {
    if (!url) {
      return Promise.resolve();
    }

    return rp(url)
      .then((content) => {
        const results = EmailSpy.extractPageJson(content);
        if (!results) return null;

        const nextRelativeUrl = Object.values(results.pop()).filter(isString)
          .filter(value => value.startsWith('/d.js?')).pop();
        const nextUrl = `https://duckduckgo.com${nextRelativeUrl}`;

        results.forEach((result) => {
          const parsedResult = this.parseResult(result);
          const index = this.emails.map(
            object => object.email === parsedResult.email,
          ).indexOf(true);

          if (index > -1) {
            this.emails[index].urls.push(parsedResult.url);
          } else {
            this.emails.push({
              email: parsedResult.email,
              urls: [parsedResult.url],
            });
          }
        });

        this.emails.forEach(email => email.urls.sort());
        this.emails.sort((a, b) => b.urls.length - a.urls.length);
        this.callback();

        if (Object.keys(this.emails).length > this.maximumEmails) return null;
        return nextUrl;
      });
  }

  parseResult(result) {
    const parsedResult = {};

    // find the url first
    const urlCandidates = Object.values(result).filter(isString).filter(value => (
      value.startsWith('http://') || value.startsWith('https://')
    )).sort();
    for (let i = 0; i < urlCandidates.length - 1; i += 1) {
      if (urlCandidates[i] === urlCandidates[i + 1]) {
        parsedResult.url = urlCandidates[i];
        break;
      }
    }

    // then the email address
    const snippet = Object.values(result).filter(isString)
      .map(value => value.replace('@<b>', '<b>@'))
      .map(value => value.replace(new RegExp(this.domain, 'ig'), this.domain))
      .filter(value => value.includes(`<b>@${this.domain}</b>`))
      .pop()
      .replace(`<b>@${this.domain}</b>`, `@${this.domain}`);
    parsedResult.snippet = snippet;

    const re = new RegExp(
      String.raw`(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@${escapeRegEx(this.domain)}`,
    );

    parsedResult.email = snippet.match(re).shift();

    return parsedResult;
  }

  getFirstUrl() {
    return rp(`https://duckduckgo.com/?q=%22%40${this.domain}%22&ia=web`)
      .then((content) => {
        const relativeUrl = /'(\/d.js[^']*)/.exec(content)[1];
        return `https://duckduckgo.com${relativeUrl}`;
      });
  }

  static extractPageJson(content) {
    try {
      const json = content.match(/(\[{.*}\])/g).pop();
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }
}

export default EmailSpy;
