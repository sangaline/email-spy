import React from 'react';
import PropTypes from 'prop-types';


class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'hi' };
  }

  render() {
    return (
      <li className="list-group-item">
        <a target="_blank" rel="noopener noreferrer" href={`mailto:${this.props.email}`}>{this.props.email}</a>
        <span className="badge">{this.props.urls.length}</span>
      </li>
    );
  }
}
Result.propTypes = {
  email: PropTypes.string.isRequired,
  urls: PropTypes.array.isRequired,
};

const Results = props => (
  <div>
    <h4 className="text-center">{props.emails.length} Results</h4>
    <ul className="list-group">
      {props.emails.map(data => (
        <Result key={data.email} email={data.email} urls={data.urls} />
      ))}
    </ul>
  </div>
);
Results.propTypes = {
  emails: PropTypes.array.isRequired,
};

export { Results as default, Result };
