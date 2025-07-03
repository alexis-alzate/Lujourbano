// Visualizer.jsx - ESPECTROGRAMA REAL MEJORADO
import React, { useRef, useEffect } from 'react';
import './Visualizer.css';

const Visualizer = ({ audioRef, isPlaying }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar el canvas para alta resolución
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    // Inicializar AudioContext solo una vez
    const initAudio = () => {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256; // 128 barras
        analyserRef.current.smoothingTimeConstant = 0.9; // Movimiento suave
        
        // Conectar el audio al analizador
        try {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        } catch (err) {
          console.log('Audio ya conectado');
        }
      }
    };

    // Función de dibujo del espectrograma
    const draw = () => {
      if (!analyserRef.current) return;
      
      animationIdRef.current = requestAnimationFrame(draw);
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Limpiar canvas
      ctx.fillStyle = 'rgba(8, 10, 16, 0.98)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const barWidth = (canvas.offsetWidth / bufferLength) * 2.5;
      const barSpacing = 0.4;
      let x = 0;

      // Crear un gradiente horizontal ultra suave con transiciones mínimas
      const horizontalGradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);
      // Solo usar tonos azul-violeta para evitar el salto al fucsia
      horizontalGradient.addColorStop(0, 'rgba(99, 102, 241, 0.95)');    // Azul índigo
      horizontalGradient.addColorStop(0.25, 'rgba(117, 98, 243, 0.95)'); // Azul-violeta
      horizontalGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.95)');  // Violeta
      horizontalGradient.addColorStop(0.75, 'rgba(161, 86, 247, 0.95)'); // Violeta-púrpura
      horizontalGradient.addColorStop(1, 'rgba(183, 80, 245, 0.95)');    // Púrpura suave

      for (let i = 0; i < bufferLength; i++) {
        // Normalizar altura con boost uniforme
        let barHeight = dataArray[i] / 255 * canvas.offsetHeight * 0.85;
        
        // Boost muy suave y uniforme
        const normalizedPosition = i / bufferLength;
        const boostFactor = 1 + (0.15 * (1 - normalizedPosition));
        barHeight *= boostFactor;
        barHeight = Math.min(barHeight, canvas.offsetHeight * 0.92); // Limitar altura máxima
        
        // Crear gradiente vertical para cada barra
        const gradient = ctx.createLinearGradient(0, canvas.offsetHeight - barHeight, 0, canvas.offsetHeight);
        
        // Calcular el color base según la posición horizontal
        const position = i / bufferLength;
        
        // Usar el gradiente horizontal como base
        ctx.fillStyle = horizontalGradient;
        
        // Aplicar gradiente vertical con transparencia muy sutil
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.05})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(0, 0, 0, ${0.05})`);
        
        // Dibujar la barra base con el gradiente horizontal
        const radius = 2;
        ctx.beginPath();
        ctx.moveTo(x, canvas.offsetHeight);
        ctx.lineTo(x, canvas.offsetHeight - barHeight + radius);
        ctx.quadraticCurveTo(x, canvas.offsetHeight - barHeight, x + radius, canvas.offsetHeight - barHeight);
        ctx.lineTo(x + barWidth - radius, canvas.offsetHeight - barHeight);
        ctx.quadraticCurveTo(x + barWidth, canvas.offsetHeight - barHeight, x + barWidth, canvas.offsetHeight - barHeight + radius);
        ctx.lineTo(x + barWidth, canvas.offsetHeight);
        ctx.closePath();
        ctx.fill();

        // Añadir brillo muy sutil solo en picos muy altos
        if (barHeight > canvas.offsetHeight * 0.75) {
          ctx.save();
          
          // Crear un brillo muy suave
          const glowIntensity = Math.min((barHeight / canvas.offsetHeight) * 0.2, 0.15);
          ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity})`;
          ctx.fillRect(x, canvas.offsetHeight - barHeight - 2, barWidth, 1);
          
          ctx.restore();
        }

        x += barWidth + barSpacing;
      }
    };

    // Dibujar visualización estática cuando está pausado
    const drawStatic = () => {
      ctx.fillStyle = 'rgba(8, 10, 16, 1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const barCount = 64;
      const barWidth = canvas.offsetWidth / barCount - 1;
      
      // Crear gradiente horizontal para las barras estáticas
      const staticGradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);
      staticGradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
      staticGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      staticGradient.addColorStop(1, 'rgba(183, 80, 245, 0.15)');
      
      ctx.fillStyle = staticGradient;
      
      for (let i = 0; i < barCount; i++) {
        const height = Math.sin(i * 0.1) * 15 + Math.random() * 5 + 20;
        ctx.fillRect(i * (barWidth + 1), canvas.offsetHeight - height, barWidth, height);
      }
    };

    // Manejar play/pause
    if (isPlaying) {
      initAudio();
      
      // Resumir contexto si está suspendido
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      draw();
    } else {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      drawStatic();
    }

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [audioRef, isPlaying]);

  // Click para resumir AudioContext (algunos navegadores lo requieren)
  const handleCanvasClick = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="visualizer-canvas" 
      width="320" 
      height="120"
      onClick={handleCanvasClick}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Visualizer;