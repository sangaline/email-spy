import React from 'react';
import PropTypes from 'prop-types';

// import EmailSpy from '../email-spy';
import Search from './search';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.updateIfReady = this.updateIfReady.bind(this);
    this.state = {
      emailSpy: null, // new EmailSpy(props.initialDomain, this.updateIfReady),
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  updateIfReady() {
    if (this.mounted) this.forceUpdate();
  }

  render() {
    return (<div>
      <h1>Email Spy</h1>
      <Search defaultValue={this.props.initialDomain} />
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
