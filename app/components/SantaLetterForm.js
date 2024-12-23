"use client"
import React, { useState } from 'react';

const SantaIcon = () => (
  <svg className="w-24 h-24 mx-auto mb-5" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="30" fill="#cc0000"/>
    <circle cx="50" cy="35" r="15" fill="#ffe0d0"/>
    <circle cx="45" cy="32" r="2" fill="black"/>
    <circle cx="55" cy="32" r="2" fill="black"/>
    <path d="M45 40 Q50 45 55 40" stroke="black" fill="none" strokeWidth="2"/>
    <rect x="35" y="25" width="30" height="10" fill="#cc0000"/>
    <circle cx="65" cy="25" r="5" fill="#ffffff"/>
  </svg>
);

const Snowflake = ({ style }) => (
  <div 
    className="absolute text-white text-xl pointer-events-none animate-snowfall"
    style={style}
  >
    ❅
  </div>
);

const SantaLetterForm = () => {
  const [letter, setLetter] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendLetter = async () => {
    if (letter.trim() === '') {
      alert('Please write a letter first!');
      return;
    }

    setIsSending(true);
    setError('');
    
    try {
      const res = await fetch('/api/santa-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letter }),
      });

      if (!res.ok) {
        throw new Error('Failed to send letter');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError('Oh no! There was a problem delivering your letter to the North Pole. Please try again!');
      console.error('Error sending letter:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gradient-to-b from-[#1a3b5c] to-[#2d5c8c] flex justify-center items-center font-['Mountains_of_Christmas']">
      <div className="bg-white/95 rounded-2xl p-8 max-w-3xl w-11/12 shadow-lg">
        <SantaIcon />
        
        <h1 className="text-red-600 text-4xl text-center mb-8">
          Write a Letter to Santa! 🎄
        </h1>
        
        <div className="mb-8">
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="w-full min-h-[200px] p-4 border-2 border-red-600 rounded-lg text-base mb-4 font-inherit resize-none focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
            placeholder="Dear Santa..."
            disabled={isSending}
          />
          
          <button
            onClick={sendLetter}
            disabled={isSending}
            className="bg-red-600 text-white px-8 py-3 rounded-full text-lg cursor-pointer transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending to North Pole...' : 'Send to North Pole 🎅'}
          </button>
        </div>
        
        {error && (
          <div className="p-5 border-2 border-red-500 rounded-lg mt-8 bg-red-50 text-red-700">
            {error}
          </div>
        )}
        
        {response && !error && (
          <div className="p-5 border-2 border-green-800 rounded-lg mt-8 bg-gray-50 text-black">
            <h3 className="text-xl font-bold mb-3">Santa's Response:</h3>
            <p className="mb-4">{response}</p>
            <p className="text-right">- Santa Claus 🎅</p>
          </div>
        )}
      </div>
      
      {/* Add snowflakes animation with CSS */}
      <style jsx global>{`
        @keyframes snowfall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        .animate-snowfall {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SantaLetterForm;