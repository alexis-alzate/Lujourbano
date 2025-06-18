import { useState, useRef, useEffect } from 'react';
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';
import Header from './components/Header.jsx';

// --- PASO 1: IMPORTAMOS LAS IMÁGENES DESDE LA CARPETA ASSETS ---
// Asegúrate de que la ruta './assets/img/...' sea correcta.
import cover1 from './assets/img/cover1.jpg';
import cover2 from './assets/img/cover2.jpg';

function App() {
  const [beats, setBeats] = useState([
    {
      id: 1,
      title: "Vibras de Verano",
      producer: "Producido por Zaeta",
      artist: "Artista Famoso",
      audioSrc: "/audio/beat1.mp3", // El audio se queda en la carpeta public
      
      // --- PASO 2: Usamos la variable importada (sin comillas) ---
      coverSrc: cover1, 
      
      genre: "Reggaeton",
      spotifyUrl: "https://www.spotify.com"
    },
    {
      id: 2,
      title: "Noche en Medallo",
      producer: "Producido por Zaeta",
      artist: "Otro Artista",
      audioSrc: "/audio/beat2.mp3",

      // --- PASO 2: Usamos la variable importada (sin comillas) ---
      coverSrc: cover2,

      genre: "Trap",
      spotifyUrl: "https://googleusercontent.com/spotify.com"
    }
  ]);

  // --- El resto del código se queda exactamente igual ---
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(beats[currentTrackIndex].audioSrc));

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Error al reproducir:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = beats[currentTrackIndex].audioSrc;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Error al cambiar de pista:", e));
    }
  }, [currentTrackIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % beats.length);
  const handlePrevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + beats.length) % beats.length);
  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
   <div className="window-container">
      {/* ⬇️ NUEVO COMPONENTE AÑADIDO ⬇️ */}
      <Header currentBeat={beats[currentTrackIndex]} ></Header>

      <div id="beat-player">
        <Player 
          currentBeat={beats[currentTrackIndex]}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          audioRef={audioRef}
        />
        
        
        
        <Playlist 
          beats={beats}
          currentTrackIndex={currentTrackIndex}
          onTrackSelect={handleTrackSelect}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
}

export default App;