// useState를 사용하기 위해서 react 라이브러리에서 가져옵니다.
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
//

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='container'>
          <form className='example'>
            <input
              type='text'
              placeholder='입력해주세요...'
            />
            <button type='submit'>확인.</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
