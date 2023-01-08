import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';
import getTodaysPuzzle from './lib/getTodaysPuzzle';
import { useState } from 'react';
import { DIGITS_TO_GUESS_COUNT, MAX_CHALLENGES } from './constants/settings';
import evaluateGuess from './lib/evaluateGuess';
import Hint from './models/Hint';
import HintBanner from './components/hint-banner/HintBanner';
import Navbar from './components/navbar/Navbar';
import LargerTextModal from './components/modals/LargerTextModal';

export default function App() {
  const puzzle = getTodaysPuzzle();

  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);

  const [hintTextBanner, setHintTextBanner] = useState('');
  const [hintSumBanner, setHintSumBanner] = useState('');

  const [isLargerTextModalOpen, setIsLargerTextModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const onChar = (value: string) => {
    if (currentGuess.length < DIGITS_TO_GUESS_COUNT && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  }

  const onDelete = () => {
    setCurrentGuess(Array.from(currentGuess).slice(0, -1).join(''));
  }

  const onEnter = () => {
    if (currentGuess.length < DIGITS_TO_GUESS_COUNT) {
      return;
    }

    const hint = evaluateGuess(currentGuess, puzzle.answer, guesses.length + 1);
    setHints([...hints, hint]);

    if (guesses.length < MAX_CHALLENGES) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');

      if (hintTextBanner === hint.text) {
        hint.text += ' '; // to trigger the Hint Text Banner flip
      }

      setHintTextBanner(hint.text ?? '');

      setHintSumBanner(hint.isCorrect || hint.isGameLost ? ' ' : `The sum of the digits is ${computeDigitSum(puzzle.answer)}.`);

      if (hint.isCorrect) {
        setIsGameWon(true);
      }
    }
  }

  const computeDigitSum = (input: number): number => {
    let sum = 0;

    while (input) {
      sum += input % 10;
      input = Math.floor(input / 10);
    }

    return sum;
  }

  const handleHintButtonClick = () => {
    setModalText(puzzle.hint ?? '');
    setIsLargerTextModalOpen(true);
  }

  return (
    <Div100vh>
      <div className='flex flex-col h-full max-w-sm mx-auto py-2'>
        <Navbar />
        <div className='h-16 flex items-center justify-center text-center font-bold text-slate-600 mt-2 px-3'>
          <span>{puzzle.question}
            {puzzle.hint &&
              <button
                className='ml-2 px-3 text-sm font-normal border-2 rounded-full bg-slate-50'
                onClick={handleHintButtonClick}>
                Hint
              </button>
            }
          </span>
        </div>
        <div className='flex grow flex-col px-3'>
          <div className='flex grow flex-col justify-center'>
            <Grid
              answer={puzzle.answer}
              guesses={guesses}
              currentGuess={currentGuess}
              hints={hints}
              isGameWon={isGameWon}
            />
            <HintBanner text={hintTextBanner} />
            <HintBanner text={hintSumBanner} isSumBanner={true} />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
          />
          <LargerTextModal
            text={modalText}
            isOpen={isLargerTextModalOpen}
            handleClose={() => setIsLargerTextModalOpen(false)}
          />
        </div>
      </div>
    </Div100vh>
  );
}
