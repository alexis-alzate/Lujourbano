    // src/components/Visualizer.jsx
    import React, { useRef, useEffect } from 'react';
    import './Visualizer.css';

    const Visualizer = ({ audioRef, isPlaying }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        if (audio.source) { // Evita reconectar si ya existe
        // Opcional: si quieres que la fuente se reconecte en cada render,
        // necesitaríamos una lógica de desconexión más compleja.
        // Por ahora, lo mantenemos simple.
        } else {
        const source = audioCtx.createMediaElementSource(audio);
        audio.source = source; // Guardamos la fuente
        const analyser = audioCtx.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 256;
        audio.analyser = analyser; // Guardamos el analizador también
        }
        
        const analyser = audio.analyser;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let animationFrameId;

        const draw = () => {
        animationFrameId = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = '#1818'; // Color de fondo del canvas
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        // Creamos el gradiente que va de izquierda a derecha
        const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#3a8dff');    // Azul
        gradient.addColorStop(0.5, '#9c27b0');  // Morado
        gradient.addColorStop(1, '#e91e63');    // Fucsia/Rosa

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 1.5; // Hacemos las barras un poco más altas
            canvasCtx.fillStyle = gradient; // Usamos el gradiente
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 2;
        }
        };

        if (isPlaying) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        draw();
        } else {
        cancelAnimationFrame(animationFrameId);
        }
            
        return () => {
        cancelAnimationFrame(animationFrameId);
        };

    }, [audioRef, isPlaying]);

    return <canvas ref={canvasRef} className="visualizer-canvas" width="350" height="150"/>;
    };

    export default Visualizer;