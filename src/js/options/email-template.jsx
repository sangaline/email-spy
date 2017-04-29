import React from 'react';

class EmailTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { subject: '', body: '' };

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSubjectChange(event) {
    this.setState({ subject: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleSave(event) {
    event.preventDefault();
    // TODO: actually save it
  }

  render() {
    return (
      <div>
        <h1>Email Template</h1>
        <p>
          This email subject and body will be prefilled when you click on an email
          link to contact somebody. This can be useful if you&#39;re going to be sending
          a number of very similar emails.
        </p>

        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <form name="email-template-form" onSubmit={this.handleSave}>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  name="subject"
                  type="text"
                  className="form-control"
                  placeholder="Your default subject..."
                  onChange={this.handleSubjectChange}
                  value={this.state.subject}
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea
                  name="body"
                  className="form-control"
                  rows="6"
                  placeholder="Your default email body..."
                  onChange={this.handleBodyChange}
                  value={this.state.body}
                />
              </div>

              <input
                name="submit"
                type="submit"
                className="btn btn-primary pull-right"
                value="Save"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailTemplate;
