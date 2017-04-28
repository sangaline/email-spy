import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.state.value);
  }

  render() {
    return (
      <form className="navbar-form" role="search">
        <div className="input-group add-on">
          <input
            className="form-control"
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            name="srch-term"
            id="srch-term"
            type="text"
          />
          <p>{this.state.value}</p>
          <div className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit"
              onClick={this.handleClick}
            >
              { this.props.searching && this.state.value === this.props.defaultValue
                ? <i className="glyphicon glyphicon-refresh spinning" />
                : <i className="glyphicon glyphicon-search" />
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}
Search.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  searching: PropTypes.bool,
};
Search.defaultProps = {
  onClick: () => {},
  placeholder: 'example.com',
  searching: true,
};

export default Search;
