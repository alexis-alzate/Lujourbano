// src/components/Waveform.jsx

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

// Recibimos audioUrl e isPlaying desde App.jsx -> ProducerProfile.jsx
const Waveform = ({ audioUrl, isPlaying }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    // ... (el resto de tu código useEffect para crear la onda es correcto)
    // ...
    const options = {
        container: waveformRef.current,
        waveColor: '#CDB1E9',
        progressColor: '#6D22D0',
        cursorColor: 'transparent',
        barWidth: 3,
        barRadius: 3,
        barGap: 3,
        height: 80,
        responsive: true,
        interact: false, 
    };
    wavesurferRef.current = WaveSurfer.create(options);
    wavesurferRef.current.load(audioUrl);

    return () => wavesurferRef.current.destroy();
  }, [audioUrl]);


  // Este useEffect escucha si 'isPlaying' cambia y da la orden de play/pause
  useEffect(() => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isPlaying]);

  // CORRECCIÓN: Devolvemos SOLAMENTE el div. ¡Hemos quitado el botón!
  return (
   // En Waveform.jsx, cambia la línea del return por esta:

  <div 
    ref={waveformRef}
    className={isPlaying ? 'waveform-playing' : ''}
  ></div>

  );
};

export default Waveform;