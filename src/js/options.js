import React from 'react';
import { render } from 'react-dom';

import '../css/options.css';
import Options from './options/options';

render(
  React.createElement(Options),
  window.document.getElementById('app'),
);
