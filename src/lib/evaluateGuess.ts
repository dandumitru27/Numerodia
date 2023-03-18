import { DIGITS_TO_GUESS_COUNT, MAX_CHALLENGES } from "../constants/settings";
import Direction from "../enums/Direction";
import Trophy from "../enums/Trophy";
import Hint from "../models/Hint";
import { getTrophyExclamation } from "./trophies";
import i18next, { t } from 'i18next';
import { getNumberFormatted } from "../i18n/translate-methods";

const thresholds = [90, 50, 10, 5, 1];

export default function evaluateGuess(guess: string, answer: number, guessNumber: number): Hint {
  const hint: Hint = {};

  const answerMagnitude = Math.pow(10, answer.toString().length - DIGITS_TO_GUESS_COUNT);

  var guessFull = Number(guess) * answerMagnitude;

  if (guessFull === answer) {
    hint.isCorrect = true;

    hint.text = t('That\'s correct') + '. ';

    if (guessNumber <= 2) {
      hint.trophy = Trophy.Gold;
    } else if (guessNumber === 3) {
      hint.trophy = Trophy.Silver;
    } else {
      hint.trophy = Trophy.Bronze;
    }

    hint.text += getTrophyExclamation(hint.trophy);

    return hint;
  }

  if (guessNumber === MAX_CHALLENGES) {
    hint.isGameLost = true;
    hint.text = t('Incorrect') + '. ' + t('Better luck tomorrow') + '!';

    return hint;
  }

  if (guessFull < answer) {
    hint.arrowDirection = Direction.Up;

    computeHintText(answer, guessFull, answerMagnitude, hint, 'more');
  } else {
    hint.arrowDirection = Direction.Down;

    computeHintText(answer, guessFull, answerMagnitude, hint, 'less');
  }

  return hint;
}

function computeHintText(answer: number, guessFull: number, answerMagnitude: number, hint: Hint, comparationText: 'more' | 'less') {
  for (let index = 1; index < thresholds.length; index++) {
    const threshold = thresholds[index];

    const thresholdFull = threshold * answerMagnitude;

    if (Math.abs(answer - guessFull) >= thresholdFull) {
      hint.arrowCount = threshold >= 10 ? 2 : 1;

      const previousThreshold = thresholds[index - 1];

      const previousThresholdFull = previousThreshold * answerMagnitude;

      const { numberText: lowerNumber } = getNumberWrittenForm(thresholdFull);
      const { numberText: upperNumber, magnitude } = getNumberWrittenForm(previousThresholdFull, true);

      // EN: 'More: 10 to 50 millions more.'
      // RO: 'Mai mult cu 10 până la 50 de milioane.'
      hint.text = capitalizeFirstLetter(t(comparationText));

      if (i18next.language === "en" && hint.arrowCount === 2) {
        hint.text = 'Way ' + comparationText;
      }

      if (i18next.language === "en") {
        hint.text += ': ';
      } else if (i18next.language === "ro") {
        hint.text += ' cu ';
      }

      hint.text += lowerNumber + ' ' + t('to') + ' ' + upperNumber + (magnitude ?? '');

      if (i18next.language === "en") {
        hint.text += ' ' + comparationText;
      }

      hint.text += '.'

      break;
    }
  }
}

function getNumberWrittenForm(inputNumber: number, isUpperMargin = false): { numberText: string, magnitude?: string } {
  let magnitude = undefined;

  if (isUpperMargin) {
    if (inputNumber === 1_000_000_000) {
      inputNumber = 900_000_000;
    } else if (inputNumber === 1_000_000) {
      inputNumber = 900_000;
    }
  }

  if (inputNumber >= 1_000_000_000) {
    inputNumber = inputNumber / 1_000_000_000;
    magnitude = "billions";
  }
  else if (inputNumber >= 1_000_000) {
    inputNumber = inputNumber / 1_000_000;
    magnitude = "millions";
  }

  if (magnitude) {
    let prefix = ' ';

    if (inputNumber >= 20 && i18next.language === "ro") {
      prefix += 'de ';
    }

    magnitude = prefix + t(magnitude);
  }

  return { numberText: getNumberFormatted(inputNumber), magnitude };
}

function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}