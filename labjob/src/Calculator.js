import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  // ✅ Memoized click handler
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

  // ✅ Handle keyboard input safely
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

  return (
    <div className="calculator-container">
      <h2>Grocery Store Calculator</h2>
      <input
        className="calc-input"
        type="text"
        value={input}
        placeholder="Enter calculation"
        readOnly
      />
      <div className="calc-result">{result !== '' ? `Result: ${result}` : ''}</div>
      <div className="calc-buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "C", "+"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button className="equals-btn" onClick={() => handleClick('=')}>=</button>
      </div>
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#388e3c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        ← Go Back
      </button>
    </div>
  );
};

export default Calculator;
