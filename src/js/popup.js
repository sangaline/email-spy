import React from 'react';
import { render } from 'react-dom';

import '../css/popup.css';
import Placeholder from './popup/placeholder';

render(
  React.createElement(Placeholder),
  window.document.getElementById('app'),
);
