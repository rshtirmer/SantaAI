'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Gift, Sparkles, Stars, Mic, Square, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ChristmasIcon = ({ children, color = 'text-red-600' }) => (
  <div className={`absolute ${color} animate-bounce`}>
    {children}
  </div>
);

const SantaIcon = () => (
  <div className="relative w-32 h-32 mx-auto mb-5 transition-transform hover:scale-110 cursor-pointer">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="30" fill="#cc0000"/>
      <circle cx="50" cy="35" r="15" fill="#ffe0d0"/>
      <circle cx="45" cy="32" r="2.5" fill="#000000"/>
      <circle cx="55" cy="32" r="2.5" fill="#000000"/>
      <circle cx="40" cy="38" r="3" fill="#ffb3b3" opacity="0.6"/>
      <circle cx="60" cy="38" r="3" fill="#ffb3b3" opacity="0.6"/>
      <path d="M42 40 Q50 46 58 40" stroke="#000000" fill="none" strokeWidth="2"/>
      <path d="M35 38 Q50 48 65 38" stroke="#ffffff" fill="none" strokeWidth="4"/>
      <path d="M25 25 L75 25 L65 15 L35 15 Z" fill="#cc0000"/>
      <rect x="20" y="25" width="60" height="8" fill="#ffffff"/>
      <circle cx="75" cy="25" r="6" fill="#ffffff"/>
    </svg>
    <div className="absolute top-0 right-0 animate-ping">
      <Sparkles size={16} className="text-yellow-400" />
    </div>
    <div className="absolute bottom-0 left-0 animate-pulse">
      <Stars size={16} className="text-yellow-400" />
    </div>
  </div>
);

const VoiceRecorder = ({ onTranscription, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await sendAudioToDeepgram(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const sendAudioToDeepgram = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      onTranscription(data.transcript);
    } catch (error) {
      console.error('Error sending audio to Deepgram:', error);
      alert('Sorry, there was an error processing your voice message. Please try again!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled || isProcessing}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold ${
        isRecording 
          ? 'bg-red-600 text-white animate-pulse' 
          : 'bg-green-600 text-white'
      } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
    >
      {isRecording ? (
        <>
          <Square className="w-5 h-5" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="w-5 h-5" />
          {isProcessing ? 'Processing...' : 'Record Your Letter'}
        </>
      )}
    </button>
  );
};

const SnowfallEffect = () => {
  const [mounted, setMounted] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    setMounted(true);
    setSnowflakes(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        opacity: Math.random() * 0.8 + 0.2,
      }))
    );
  }, []);

  if (!mounted) return null;
  
  return (
    <>
      {snowflakes.map((flake) => (
        <div 
          key={flake.id}
          className="absolute text-white text-xl pointer-events-none animate-snowfall"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            opacity: flake.opacity,
          }}
        >
          ❅
        </div>
      ))}
    </>
  );
};

const Loading = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="relative">
      <Gift size={48} className="text-red-600 animate-bounce" />
      <div className="absolute top-0 right-0">
        <Sparkles size={16} className="text-yellow-400 animate-ping" />
      </div>
    </div>
    <p className="text-lg font-bold text-red-600 animate-pulse">
      Delivering to North Pole...
    </p>
  </div>
);

const SantaLetterForm = () => {
  const [letter, setLetter] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [allowSharing, setAllowSharing] = useState(true);
  const audioRef = useRef(null);

  const sendLetter = async () => {
    if (letter.trim() === '') {
      alert('Please write your letter to Santa first! 🎅');
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
        body: JSON.stringify({ letter, allowSharing }),
      });

      if (!res.ok) {
        throw new Error('Failed to send letter');
      }

      const data = await res.json();
      setResponse(data.response);

      // Play jingle sound
      new Audio('/jingle.mp3').play().catch(() => {});
    } catch (err) {
      setError('Oh no! The reindeer lost your letter! Please try again! 🦌');
      console.error('Error sending letter:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("/snow.jpeg")', backgroundAttachment: 'fixed' }}>
      <div className="min-h-screen overflow-y-auto bg-black/20">
        <SnowfallEffect />
        
        <div className="flex justify-center items-center p-8 pb-16">
        <div className="max-w-3xl w-full">
        <h1 className="font-serif text-6xl mb-2 text-white">Letters to</h1>
        <h1 className="font-serif text-6xl mb-12 text-[#8B0000]">Santa Claude</h1>

        <div className="bg-white/90 rounded-lg p-12 shadow-lg">
          <div className="relative mb-8">
            <button
              onClick={() => setShowTips(!showTips)}
              className="absolute -top-6 right-0 text-sm text-green-700 hover:text-green-500 transition-colors"
            >
              {showTips ? 'Hide Tips' : 'Need help writing? Click here!'}
            </button>

            {showTips && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200 text-sm">
                <h3 className="font-bold text-green-700 mb-2">Tips for Writing to Santa:</h3>
                <ul className="list-disc list-inside space-y-1 text-green-600">
                  <li>Start with &quot;Dear Santa&quot;</li>
                  <li>Tell Santa how you&apos;ve been good this year</li>
                  <li>Share your Christmas wishes</li>
                  <li>Don&apos;t forget to say thank you!</li>
                  <li>Sign your name at the end</li>
                </ul>
              </div>
            )}

            <div className="relative space-y-4">
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                <VoiceRecorder 
                  onTranscription={(text) => setLetter(current => current + text)}
                  disabled={isSending}
                />
                <label className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-purple-600 text-white cursor-pointer hover:bg-purple-500 transition-colors text-center ${isProcessingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <Camera className="w-5 h-5" />
                  {isProcessingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    'Take Photo or Upload'
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={async (e) => {
                      if (isProcessingImage) return;
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append('image', file);

                      setIsProcessingImage(true);
                      try {
                        const res = await fetch('/api/vision', {
                          method: 'POST',
                          body: formData,
                        });

                        if (!res.ok) throw new Error('Failed to process image');

                        const data = await res.json();
                        setLetter(data.text);
                      } catch (error) {
                        console.error('Error processing image:', error);
                        alert('Sorry, there was an error reading your letter. Please try again!');
                      } finally {
                        setIsProcessingImage(false);
                        // Clear the input value so the same file can be selected again
                        e.target.value = '';
                      }
                    }}
                    disabled={isProcessingImage}
                  />
                </label>
              </div>
              <textarea
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                className="w-full min-h-[240px] p-6 bg-stone-50 rounded-lg text-lg font-serif text-gray-900
                placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2C3639]
                transition-all duration-300 resize-none"
                placeholder="Dear Santa..."
                disabled={isSending}
              />
              <div className="absolute top-2 right-2">
                <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <input
                type="checkbox"
                id="allowSharing"
                checked={allowSharing}
                onChange={(e) => setAllowSharing(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
              />
              <label htmlFor="allowSharing" className="text-gray-900 cursor-pointer select-none">
                Allow my letter to be shared anonymously in Santa&apos;s letter collection
              </label>
            </div>

            <button
              onClick={sendLetter}
              disabled={isSending}
              className="mt-6 bg-[#8B0000] hover:bg-[#660000] text-white px-8 py-3 
              rounded-lg text-lg transition-all duration-300 disabled:opacity-50 
              disabled:cursor-not-allowed font-light tracking-wide flex items-center justify-center gap-2"
            >
              {isSending ? (
                <Loading />
              ) : (
                <>
                  <Gift className="w-6 h-6" />
                  Send to North Pole 🎅
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-6 rounded-lg bg-white text-[#8B0000] border border-[#8B0000]">
            {error}
          </div>
        )}

        {response && !error && (
          <div className="mt-8">
            <div id="santa-letter-response" className="p-6 rounded-lg bg-white border border-[#2C3639] relative">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-[#8B0D32] -m-1"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-[#8B0D32] -m-1"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-[#8B0D32] -m-1"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-[#8B0D32] -m-1"></div>

              <div className="text-center mb-6">
                <h2 className="text-[#8B0D32] text-4xl font-bold mb-2">From Santa&apos;s Desk</h2>
                <p className="text-[#2C5530] text-lg">123 Elf Road, Northpole 8888</p>
              </div>

              <div className="mt-8 space-y-4 text-gray-900 text-lg leading-relaxed font-serif mb-8 pr-40">
                {response}
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-8 w-32 h-32 transform -rotate-12">
                <img 
                  src="/seal.png" 
                  alt="Santa&apos;s Seal of Approval" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-4 justify-center flex-wrap">
              <button
                onClick={async () => {
                  if (isPlaying && audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                    return;
                  }

                  if (audioRef.current) {
                    audioRef.current.play();
                    setIsPlaying(true);
                    return;
                  }

                  setIsLoadingAudio(true);
                  try {
                    const res = await fetch('/api/text-to-speech', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ text: response }),
                    });

                    if (!res.ok) throw new Error('Failed to generate speech');

                    const audioBlob = await res.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    audioRef.current = new Audio(audioUrl);
                    
                    audioRef.current.onended = () => {
                      setIsPlaying(false);
                      URL.revokeObjectURL(audioUrl);
                      audioRef.current = null;
                    };

                    audioRef.current.onpause = () => {
                      setIsPlaying(false);
                    };

                    audioRef.current.onplay = () => {
                      setIsPlaying(true);
                    };

                    await audioRef.current.play();
                    setIsPlaying(true);
                  } catch (error) {
                    console.error('Error playing audio:', error);
                    alert('Sorry, Santa lost his voice! Please try again later. 🎅');
                  } finally {
                    setIsLoadingAudio(false);
                  }
                }}
                disabled={isLoadingAudio}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingAudio ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Loading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isPlaying ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      )}
                    </svg>
                    {isPlaying ? 'Pause' : 'Listen to Santa\'s Letter'}
                  </>
                )}
              </button>

              <button
                onClick={async () => {
                  const element = document.getElementById('santa-letter-response');
                  if (!element) return;
                  
                  try {
                    const canvas = await html2canvas(element, {
                      scale: 2,
                      useCORS: true,
                      backgroundColor: 'white',
                      logging: false
                    });
                    
                    const link = document.createElement('a');
                    link.download = 'Letter-from-Santa.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                  } catch (error) {
                    console.error('Error generating PNG:', error);
                    alert('There was an error saving your letter. Please try again!');
                  }
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Save as PNG
              </button>

              <button
                onClick={async () => {
                  const element = document.getElementById('santa-letter-response');
                  if (!element) return;
                  
                  try {
                    const canvas = await html2canvas(element, {
                      scale: 2,
                      useCORS: true,
                      backgroundColor: 'white',
                      logging: false
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                      orientation: 'landscape',
                      unit: 'px',
                      format: [canvas.width, canvas.height]
                    });
                    
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('Letter-from-Santa.pdf');
                  } catch (error) {
                    console.error('Error generating PDF:', error);
                    alert('There was an error saving your letter. Please try again!');
                  }
                }}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Save as PDF
              </button>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default SantaLetterForm;
