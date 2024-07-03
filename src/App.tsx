import Input from './components/Input/Input';
import './App.scss'
import {About} from './components/About/About';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Counter from './components/Counter/Counter'
import FlexRow from './components/FlexRow/FlexRow';
import Header from './components/Header/Header'
import Spinners from './components/Spinners';




function App() {
  return (

    <div>
      <Header />

      <Card>
        <FlexRow className='gap-4'>
          <p>Jack Of Spades</p>
          <p>Jack Of Spades</p>
          <p>Jack Of Spades</p>
          <p>Jack Of Spades</p>
        </FlexRow>
      </Card>
      <br />
      <Card>
        <p>Jack Of Spades</p>
        <p>Jack Of Spades</p>
        <p>Jack Of Spades</p>
        <p>Jack Of Spades</p>
      </Card>
      <br />
      <FlexRow>
        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
      </FlexRow>

      <Input label='Enter your name' placeholder='Name' />

      <Counter />
      <Button text='Btn' onClick={() => alert('Hi')} variant='info' />
      <Spinners />
      <About />
      <h1 className="text-center bg-amber-100/60 p-6 text-pink-500 text-5xl font font-bold my-1">Hello World</h1>

    </div >

  );

}

export default App
