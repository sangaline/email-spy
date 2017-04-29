import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';


class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'hi' };
  }

  render() {
    const uniquishId = `${btoa(this.props.email)}-${encodeURIComponent(this.props.email)}`;
    const collapseId = `synthetic-id-${uniquishId.replace(/\W/g, '')}`;
    return (
      <li className="list-group-item">
        <a
          className="accordion-toggle collapsed"
          data-toggle="collapse"
          href={`#${collapseId}`}
        />
        <a target="_blank" rel="noopener noreferrer" href={`mailto:${this.props.email}`}>{this.props.email}</a>
        <span className="badge">{this.props.sources.length}</span>
        <div id={collapseId} className="list-group sources-container panel-collapse collapse">
          <ul className="list-group">
            {this.props.sources.map(source => (
              <Tooltip
                key={source.url}
                placement="top"
                mouseEnterDelay={0.5}
                mouseLeaveDelay={0}
                trigger={['hover']}
                overlay={<div dangerouslySetInnerHTML={{ __html: source.snippet }} />}
              >
                <li className="list-group-item">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={source.url}
                  >
                    {source.url}
                  </a>
                </li>
              </Tooltip>
            ))}
          </ul>
        </div>
      </li>
    );
  }
}
Result.propTypes = {
  email: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
};

const Results = props => (
  <div>
    <h4 className="text-center" data-toggle="popover" data-title="FUCK" data-content="heelllo">
      {props.emails.length} Results
    </h4>
    <ul className="list-group">
      {props.emails.map(data => (
        <Result key={data.email} email={data.email} sources={data.sources} />
      ))}
    </ul>
  </div>
);
Results.propTypes = {
  emails: PropTypes.array.isRequired,
};

export { Results as default, Result };
