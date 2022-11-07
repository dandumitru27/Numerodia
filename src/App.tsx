import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';

function App() {
  return (
    <Div100vh>
      <div className='flex flex-col h-full p-2'>
        <div className='text-center text-xl my-2'>How many soldiers are in North Korea's active army? (rounded)</div>
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

export default App;
