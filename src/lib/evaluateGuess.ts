import { DIGITS_TO_GUESS_COUNT } from "../constants/settings";
import Direction from "../enums/Direction";
import Medal from "../enums/Medal";
import Hint from "../models/Hint";

const thresholds = [900, 500, 100, 50, 10, 5, 1];
const locale = 'en-US';

export default function evaluateGuess(guess: string, answer: number): Hint {
  const hint: Hint = {};

  const answerMagnitude = Math.pow(10, answer.toString().length - DIGITS_TO_GUESS_COUNT);

  var guessFull = Number(guess) * answerMagnitude;

  if (guessFull === answer) {
    return { text: 'Impressive!', isCorrect: true, medal: Medal.Gold };
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
      hint.arrowCount = threshold >= 100 ? 2 : 1;

      const previousThreshold = thresholds[index - 1];

      const previousThresholdFull = previousThreshold * answerMagnitude;

      const { numberText: lowerNumber } = getNumberWrittenForm(thresholdFull, threshold);
      const { numberText: upperNumber, magnitude } = getNumberWrittenForm(previousThresholdFull, previousThreshold, true);

      hint.text = hint.arrowCount === 2
        ? `Way ${comparationText}`
        : capitalizeFirstLetter(comparationText);

      hint.text += `: ${lowerNumber} to ${upperNumber}${magnitude ?? ''} ${comparationText}.`;

      break;
    }
  }
}

function getNumberWrittenForm(inputNumber: number, threshold: number, isUpperMargin = false): { numberText: string, magnitude?: string } {
  let magnitude = undefined;

  if (isUpperMargin) {
    if (inputNumber === 1_000_000_000) {
      if (threshold === 100) {
        inputNumber = 990_000_000;
      }
      else if (threshold === 10) {
        inputNumber = 900_000_000;
      }
    } else if (inputNumber === 1_000_000) {
      if (threshold === 100) {
        inputNumber = 990_000;
      }
      else if (threshold === 10) {
        inputNumber = 900_000;
      }
    }
  }

  if (inputNumber >= 1_000_000_000) {
    inputNumber = inputNumber / 1_000_000_000;
    magnitude = " billions";
  }
  else if (inputNumber >= 1_000_000) {
    inputNumber = inputNumber / 1_000_000;
    magnitude = " millions";
  }

  return { numberText: inputNumber.toLocaleString(locale), magnitude };
}

function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}