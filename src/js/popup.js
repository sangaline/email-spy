import React from 'react';
import { render } from 'react-dom';

import '../css/popup.css';
import Popup from './popup/popup';

const getCurrentUrl = (callback) => {
  if (!chrome.tabs) {
    callback('https://intoli.com');
  } else {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
      callback(tabs[0].url);
    });
  }
};

getCurrentUrl((url) => {
  const activeDomain = url.indexOf('//') > -1 ? url.split('/')[2] : 'intoli.com';
  const currentDomain = activeDomain.startsWith('www.') ? activeDomain.slice(4) : activeDomain;
  const initialDomain = currentDomain.indexOf('.') > -1 ? currentDomain : 'intoli.com';

  render(
    React.createElement(Popup, { initialDomain }),
    window.document.getElementById('app'),
  );
});
