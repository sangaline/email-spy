import React from 'react';
import { render } from 'react-dom';

import '../css/popup.css';
import Popup from './popup/popup';

chrome.tabs.getSelected(null, (tab) => {
  const activeDomain = tab.url.split('/')[2];
  const currentDomain = activeDomain.startsWith('www.') ? activeDomain.slice(4) : activeDomain;
  const initialDomain = currentDomain.indexOf('.') > -1 ? currentDomain : 'intoli.com';

  render(
    React.createElement(Popup, { initialDomain }),
    window.document.getElementById('app'),
  );
});
