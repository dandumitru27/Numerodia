import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';
import getTodaysPuzzle from './lib/getTodaysPuzzle';
import { useEffect, useState } from 'react';
import { DIGITS_TO_GUESS_COUNT, MAX_CHALLENGES, WELCOME_INFO_MODAL_MS } from './constants/settings';
import evaluateGuess from './lib/evaluateGuess';
import Hint from './models/Hint';
import HintBanner from './components/hint-banner/HintBanner';
import Navbar from './components/navbar/Navbar';
import LargerTextModal from './components/modals/LargerTextModal';
import StatsModal from './components/modals/StatsModal';
import { addStatsForCompletedGame, loadStats } from './lib/stats';
import { loadCurrentGameStateFromLocalStorage, saveCurrentGameStateToLocalStorage } from './lib/localStorage';
import InfoModal from './components/modals/InfoModal';
import { useTranslation } from 'react-i18next';
import './i18n/config';

export default function App() {
  const { t, i18n } = useTranslation();

  const [puzzle] = useState(() => getTodaysPuzzle());
  const [currentGuess, setCurrentGuess] = useState('');

  const [hints, setHints] = useState<Hint[]>([]);

  const [lastHint, setLastHint] = useState<Hint>();

  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const [hintBanner1Text, setHintBanner1Text] = useState('');
  const [hintBanner2Text, setHintBanner2Text] = useState('');

  const [isLargerTextModalOpen, setIsLargerTextModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const [stats, setStats] = useState(() => loadStats());
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onChar = (value: string) => {
    // 0 not allowed as first digit
    if (value === '0' && currentGuess.length === 0) {
      return;
    }

    if (currentGuess.length < DIGITS_TO_GUESS_COUNT && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  }

  const onDelete = () => {
    setCurrentGuess(Array.from(currentGuess).slice(0, -1).join(''));
  }

  const onEnter = () => {
    if (
      currentGuess.length < DIGITS_TO_GUESS_COUNT ||
      guesses.length >= MAX_CHALLENGES
    ) {
      return;
    }

    const hint = evaluateGuess(currentGuess, puzzle.answer, guesses.length + 1);
    setHints([...hints, hint]);
    setLastHint(hint);

    setGuesses([...guesses, currentGuess]);
    setCurrentGuess('');

    reactToLastHint(hint);

    if (hint.isCorrect || hint.isGameLost) {
      setStats(addStatsForCompletedGame(stats, hint));
    }
  }

  const reactToLastHint = (hint: Hint) => {
    if (hintBanner1Text === hint.text) {
      hint.text += ' '; // to trigger the Hint Text Banner flip
    }

    setHintBanner1Text(hint.text ?? '');

    setHintBanner2Text((hint.isCorrect || hint.isGameLost) ? ' ' : getHintBanner2Text(hint));

    if (hint.isCorrect) {
      setIsGameWon(true);
    }

    if (hint.isGameLost) {
      setIsGameLost(true);
    }
  }

  useEffect(() => {
    if (i18n.language === 'ro') {
      document.title = "RO.Numerodia - Ghicește numărul zilei";
    }
  }, []);

  useEffect(() => {
    if (!loadCurrentGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  useEffect(() => {
    if (isGameWon || isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, 1700);
    }
  }, [isGameWon, isGameLost])

  const getHintBanner2Text = (hint: Hint): string => {
    let digit = getDigitAtIndex(0);
    let text = t('The first digit is');

    if (hint.arrowCount === 1) {
      digit = getDigitAtIndex(1);
      text = t('The second digit is');
    }

    const digitParity = digit % 2 === 0 ? 'even' : 'odd';

    return text + ' ' + t(digitParity) + '.';
  }

  const getDigitAtIndex = (index: number): number => {
    const digitStr = String(puzzle.answer)[index];
    return Number(digitStr);
  }

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadCurrentGameStateFromLocalStorage()

    if (loaded?.question !== puzzle.question) {
      return [];
    }

    if (loaded.hints) {
      setHints(loaded.hints);

      if (loaded.hints.length >= 1) {
        var lastHint = loaded.hints[loaded.hints.length - 1];

        setLastHint(lastHint);

        reactToLastHint(lastHint);
      }
    }

    return loaded.guesses;
  })

  useEffect(() => {
    if (!guesses || guesses.length === 0) {
      return;
    }

    const question = puzzle.question;
    saveCurrentGameStateToLocalStorage({ guesses, hints, question })
    // eslint-disable for a warning pointing out to put hints and question in the effect dependencies, which would only complicate things
    // eslint-disable-next-line
  }, [guesses])

  const handleHintButtonClick = () => {
    setModalText(puzzle.hint ?? '');
    setIsLargerTextModalOpen(true);
  }

  return (
    <Div100vh>
      <div className='flex flex-col h-full max-w-sm mx-auto py-2'>
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
        />
        <div className='h-16 flex items-center justify-center text-center font-bold text-slate-600 mt-2 px-3'>
          <span>{puzzle.question}
            {puzzle.hint &&
              <button
                className='ml-2 px-3 text-sm font-normal border-2 rounded-full bg-slate-50'
                onClick={handleHintButtonClick}>
                {t('Hint')}
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
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            gameStats={stats}
            lastHint={lastHint}
            answer={puzzle.answer}
          />
        </div>
      </div>
    </Div100vh>
  );
}
