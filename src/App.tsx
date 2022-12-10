import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';
import getTodaysPuzzle from './lib/getTodaysPuzzle';
import { useState } from 'react';
import { DIGITS_TO_GUESS_COUNT, MAX_CHALLENGES } from './constants/settings';
import evaluateGuess from './lib/evaluateGuess';
import Hint from './models/Hint';

export default function App() {
  const puzzle = getTodaysPuzzle();

  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);

  const onChar = (value: string) => {
    if (currentGuess.length < DIGITS_TO_GUESS_COUNT) {
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

    const hint = evaluateGuess(currentGuess, puzzle.answer);
    console.log(hint);
    setHints([...hints, hint]);

    if (guesses.length < MAX_CHALLENGES) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');
    }
  }

  return (
    <Div100vh>
      <div className='flex flex-col h-full p-2'>
        <div className='text-center text-xl my-2'>{puzzle.question}</div>
        <div className='flex grow flex-col max-w-7xl mx-auto'>
          <div className='flex grow flex-col justify-center pb-6'>
            <Grid
              answer={puzzle.answer}
              guesses={guesses}
              currentGuess={currentGuess}
              hints={hints}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
          />
        </div>
      </div>
    </Div100vh>
  );
}
