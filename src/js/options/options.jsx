import React from 'react';

import logo from '../../img/logo.svg';
import Lead from './lead';
import EmailTemplate from './email-template';

const Options = () => (
  <div className="container">
    <img src={logo} alt="Email Spy" className="logo img-responsive center-block" />
    <Lead />
    <EmailTemplate />
  </div>
);

export default Options;
