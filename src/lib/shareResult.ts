import Puzzle from '../models/puzzle';
import Hint from '../models/Hint';
import { formatDateMonth, getSiteName, getSiteUrl, getTrophyType } from '../i18n/translate-methods';
import Trophy from '../enums/Trophy';
import Direction from '../enums/Direction';

export default function shareResult(
  puzzle: Puzzle,
  hints: Hint[],
  handleShareToClipboard: () => void,
  handleShareFailure: () => void
) {
  let textToShare = getSiteName() + ' ' + formatDateMonth(new Date()) + ': ' + puzzle.question;

  textToShare += '\n' + getHintsAsEmojis(hints);

  textToShare += '\n' + getSiteUrl();

  try {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToShare)
        .then(handleShareToClipboard)
        .catch(handleShareFailure)
    } else {
      handleShareFailure()
    }
  } catch (error) {
    handleShareFailure()
  }
}

const getHintsAsEmojis = (hints: Hint[]): string => {
  let result = '';

  for (let index = 0; index < hints.length; index++) {
    const hint = hints[index];

    let emoji = '';

    if (hint.isCorrect) {
      switch (hint.trophy) {
        case Trophy.Gold:
          emoji = '🥇';
          break;
        case Trophy.Silver:
          emoji = '🥈';
          break;
        case Trophy.Bronze:
          emoji = '🥉';
          break;
      }

      emoji += ' (' + getTrophyType(hint.trophy) + ')';

    } else if (hint.isGameLost) {
      emoji = '🙁';
    } else {
      if (hint.arrowDirection === Direction.Up) {
        if (hint.arrowCount === 2) {
          emoji = '⇈';
        } else {
          emoji = '↑';
        }
      } else {
        if (hint.arrowCount === 2) {
          emoji = '⇊';
        } else {
          emoji = '↓';
        }
      }
    }

    result += (index + 1) + ') ' + emoji + '\n';
  }

  return result;
}