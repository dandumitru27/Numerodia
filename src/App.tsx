import './App.css';
import Div100vh from 'react-div-100vh'
import Grid from './components/grid/Grid';
import Keyboard from './components/keyboard/Keyboard';

function App() {
  return (
    <Div100vh>
      <div className='h-full text-center text-xl p-5'>
        <div className='mb-4'>How many employees does Twitter have (rounded)?</div>
        <div className='flex flex-col pb-6'>
          <Grid />
        </div>
        <Keyboard />
      </div>
    </Div100vh>
  );
}

export default App;
