import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable'];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();

export default function shareResult() {
  const textToShare = 'Numerodia 05/07: What is the population of Uganda?';

  const shareData: ShareData = {
    text: textToShare,
    url: 'https://numerodia.com'
  };

  let shareSucceeded = false;

  try {
    if (shouldAttemptShare(shareData)) {
      navigator.share(shareData);
      shareSucceeded = true;
    }
  } catch (error) {
    shareSucceeded = false;
  }
}

const shouldAttemptShare = (shareData: ShareData) => {
  return (
    // Firefox Mobile doesn't support share right now
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare && // canShare is available only in https
    navigator.canShare(shareData) &&
    navigator.share
  )
}