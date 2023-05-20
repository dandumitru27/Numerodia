import { UAParser } from 'ua-parser-js'
import Puzzle from '../models/puzzle';
import Hint from '../models/Hint';
import { formatDateMonth, getSiteName, getSiteUrl } from '../i18n/translate-methods';

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable'];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();

export default function shareResult(
  puzzle: Puzzle,
  hints: Hint[],
  handleShareToClipboard: () => void,
  handleShareFailure: () => void
) {
  let textToShare = getSiteName() + ' ' + formatDateMonth(new Date()) + ': ' + puzzle.question;

  textToShare += '\n' + getHintsAsEmojis(hints);

  textToShare += '\n\n' + getSiteUrl();

  const shareData: ShareData = {
    text: textToShare
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

  try {
    if (!shareSucceeded) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToShare)
          .then(handleShareToClipboard)
          .catch(handleShareFailure)
      } else {
        handleShareFailure()
      }
    }
  } catch (error) {
    handleShareFailure()
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

const getHintsAsEmojis = (hints: Hint[]): string => {
  let result = '';

  hints.forEach(hint => {
    result += hint.arrowCount;
  })

  return result;
}