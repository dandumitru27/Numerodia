import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';
import getTodaysPuzzle from './lib/getTodaysPuzzle';

export default function App() {
  const puzzle = getTodaysPuzzle();

  return (
    <Div100vh>
      <div className='flex flex-col h-full p-2'>
        <div className='text-center text-xl my-2'>{puzzle.question}</div>
        <div className='flex grow flex-col max-w-7xl mx-auto'>
          <div className='flex grow flex-col justify-center pb-6'>
            <Grid />
          </div>
          <Keyboard />
        </div>
      </div>
    </Div100vh>
  );
}
