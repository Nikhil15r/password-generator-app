import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    password: '',
    length: 8,
    numberAllowed: false,
    charAllowed: false,
    refresh: 0, 
  });

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (state.numberAllowed) str += '0123456789';
    if (state.charAllowed) str += '!@#$%^&*_-+=[]{}/~';

    for (let i = 1; i <= state.length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setState((prev) => ({ ...prev, password: pass }));
  }, [state.length, state.numberAllowed, state.charAllowed, state.refresh]);

  const copyPasswordToClipboard = useCallback(() => {
    try {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 100);
      window.navigator.clipboard.writeText(state.password);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  }, [state.password]);

  const handleRefreshPassword = () => {
    setState((prev) => ({ ...prev, refresh: prev.refresh + 1 }));
  };

  useEffect(() => {
    passwordGenerator();
  }, [state.length, state.numberAllowed, state.charAllowed, state.refresh, passwordGenerator]);

  return (
    <>
      {/* <div className='flex flex-col items-center justify-center h-screen'> */}
      <div className='w-full max-w-md mx-auto my-8 py-3 px-4 shadow-md rounded-lg text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={state.password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className='copy-btn ouline-none text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
          <button
            onClick={handleRefreshPassword}
            className='refresh-btn text-center px-3 py-0.5 shrink-0'>
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
        <div className='options-container flex justify-center text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={state.length}
              id='length-slider'
              className='cursor-pointer'
              onChange={(e) => setState((prev) => ({ ...prev, length: parseInt(e.target.value) }))}
            />
            <label htmlFor='length-slider'>Length: {state.length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={state.numberAllowed}
              id='numberInput'
              className='cursor-pointer'
              onChange={() => setState((prev) => ({ ...prev, numberAllowed: !prev.numberAllowed }))}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={state.charAllowed}
              id='charInput'
              className='cursor-pointer'
              onChange={() => setState((prev) => ({ ...prev, charAllowed: !prev.charAllowed }))}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
