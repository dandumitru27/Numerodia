import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';
import getTodaysPuzzle from './lib/getTodaysPuzzle';
import { useEffect, useState } from 'react';
import { DIGITS_TO_GUESS_COUNT, MAX_CHALLENGES } from './constants/settings';
import evaluateGuess from './lib/evaluateGuess';
import Hint from './models/Hint';
import HintBanner from './components/hint-banner/HintBanner';
import Navbar from './components/navbar/Navbar';
import LargerTextModal from './components/modals/LargerTextModal';
import StatsModal from './components/modals/StatsModal';
import { addStatsForCompletedGame, loadStats } from './lib/stats';

export default function App() {
  const puzzle = getTodaysPuzzle();

  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);

  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const [hintBanner1Text, setHintBanner1Text] = useState('');
  const [hintBanner2Text, setHintBanner2Text] = useState('');

  const [isLargerTextModalOpen, setIsLargerTextModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const [stats, setStats] = useState(() => loadStats());
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

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

      if (hintBanner1Text === hint.text) {
        hint.text += ' '; // to trigger the Hint Text Banner flip
      }

      setHintBanner1Text(hint.text ?? '');

      setHintBanner2Text(hint.isCorrect || hint.isGameLost ? ' ' : getHintBanner2Text());

      if (hint.isCorrect) {
        setIsGameWon(true);
      }

      if (hint.isGameLost) {
        setIsGameLost(true);
      }

      if (hint.isCorrect || hint.isGameLost) {
        setStats(addStatsForCompletedGame(stats, hint));
      }
    }
  }

  useEffect(() => {
    if (isGameWon || isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, 1700);
    }
  }, [isGameWon, isGameLost])

  const getHintBanner2Text = (): string => {
    const firstDigit = getDigitAtIndex(0);

    if (firstDigit < 3) {
      return getParityText();
    } else {
      return `The sum of the digits is ${computeDigitSum(puzzle.answer)}.`;
    }
  }

  const getDigitAtIndex = (index: number): number => {
    const digitStr = String(puzzle.answer)[index];
    return Number(digitStr);
  }

  const getParityText = (): string => {
    const firstDigit = getDigitAtIndex(0);
    const secondDigit = getDigitAtIndex(1);

    const firstDigitParity = firstDigit % 2 === 0 ? 'even' : 'odd';
    const secondDigitParity = secondDigit % 2 === 0 ? 'even' : 'odd';

    if (firstDigitParity === secondDigitParity) {
      return `The first two digits are ${secondDigitParity}.`
    } else {
      return `The second digit is ${secondDigitParity}.`
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
        <Navbar setIsStatsModalOpen={setIsStatsModalOpen} />
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
            <HintBanner text={hintBanner1Text} />
            <HintBanner text={hintBanner2Text} isBanner2={true} />
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
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            gameStats={stats}
          />
        </div>
      </div>
    </Div100vh>
  );
}
