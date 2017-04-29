import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../img/logo.png';
import EmailSpy from '../email-spy';
import Search from './search';
import Results from './results';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.startNewSearch = this.startNewSearch.bind(this);
    this.updateIfReady = this.updateIfReady.bind(this);
    this.state = {
      emailSpy: new EmailSpy(props.initialDomain, this.updateIfReady),
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  startNewSearch(domain) {
    this.state.emailSpy.abort();
    this.setState({ emailSpy: new EmailSpy(domain, this.updateIfReady) });
  }

  updateIfReady() {
    if (this.mounted) this.forceUpdate();
  }

  render() {
    return (<div>
      <a
        className="options-link"
        target="_blank"
        rel="noopener noreferrer"
        href="/options.html"
        title="Options"
      >
        <span className="glyphicon glyphicon-cog" />
      </a>
      <img src={logo} alt="Email Spy" className="logo img-responsive center-block" />
      <Search
        defaultValue={this.state.emailSpy.domain}
        onClick={this.startNewSearch}
        searching={this.state.emailSpy.active}
      />
      <Results emails={this.state.emailSpy.emails} />
    </div>);
  }
}
Popup.propTypes = {
  initialDomain: PropTypes.string,
};
Popup.defaultProps = {
  initialDomain: 'intoli.com',
};

export default Popup;
