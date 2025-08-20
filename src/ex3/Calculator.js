import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calculator.css';

const h = React.createElement;

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleClick = useCallback((value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult);
      } catch {
        setResult('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.'].includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === 'Enter') {
        handleClick('=');
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (key.toLowerCase() === 'c') {
        handleClick('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClick]);

  const buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "C", "+"]; 

  return h(
    'div',
    { className: 'calculator-container' },
    h('h2', null, 'Grocery Store Calculator'),
    h('input', {
      className: 'calc-input',
      type: 'text',
      value: input,
      placeholder: 'Enter calculation',
      readOnly: true,
    }),
    h('div', { className: 'calc-result' }, result !== '' ? `Result: ${result}` : ''),
    h(
      'div',
      { className: 'calc-buttons' },
      ...buttons.map((btn) =>
        h(
          'button',
          { key: btn, onClick: () => handleClick(btn) },
          btn
        )
      ),
      h(
        'button',
        { className: 'equals-btn', onClick: () => handleClick('=') },
        '='
      )
    ),
    h(
      'button',
      {
        style: {
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#388e3c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        },
        onClick: () => navigate('/'),
      },
      '← Go Back'
    )
  );
}
