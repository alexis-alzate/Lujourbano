import { useState, useRef, useEffect } from 'react';
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';
import Header from './components/Header.jsx';
import cover1 from './assets/img/cover1.jpg';
import cover2 from './assets/img/cover2.jpg';
import cover3 from  './assets/img/cover3.jpg';

function App() {
  const [beats, setBeats] = useState([
    {
      id: 1,
      title: "Tengo una Reina valera",
      producer: "Zaeta Music",
      artist: "Jesus Family",
      audioSrc: "/audio/Reina_valera.mp3",
      coverSrc: cover1,
      genre: "Trap",
      spotifyUrl: "https://open.spotify.com/intl-es/track/5YIiEZRb3TU1U5LMs7FRsN"
    },
    {
      id: 2,
      title: "Hoy me levante",
      producer: "Producido por Zaeta Music",
      artist: "Polimaba",
      audioSrc: "/audio/Hoy me levante.mp3",
      coverSrc: cover2,
      genre: "Trap",
      spotifyUrl: "https://open.spotify.com/intl-es/album/19v1XTZ87SSchYjYAiEbWs"
    },
  
  {
      id: 3,
      title: "Mano arriba",
      producer: "Producido por Zaeta Music",
      artist: "Julian Ramos",
      audioSrc: "/audio/Mano arrimba.wav",
      coverSrc: cover3,
      genre: "Trap",
      spotifyUrl: "https://open.spotify.com/intl-es/album/6kih0fAozoCEncepF8PhuI"
    }
  
  
  
  
  
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // --- CAMBIO 1: Creamos el estado para el término de búsqueda ---
  const [searchTerm, setSearchTerm] = useState('');

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
    // Necesitamos encontrar el índice correcto en la lista original, no en la filtrada
    const originalIndex = beats.findIndex(beat => beat.id === index);
    setCurrentTrackIndex(originalIndex);
    setIsPlaying(true);
  };

  // --- CAMBIO 2: Creamos la lista filtrada antes de mostrarla ---
  const filteredBeats = beats.filter(beat =>
    beat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="window-container">
      <Header currentBeat={beats[currentTrackIndex]} />
      <div id="beat-player">
        <Player 
          currentBeat={beats[currentTrackIndex]}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          audioRef={audioRef}
        />
        {/* --- CAMBIO 3: Pasamos la lista filtrada y la función de búsqueda a la Playlist --- */}
        <Playlist 
          beats={filteredBeats}
          currentTrackIndex={currentTrackIndex}
          onTrackSelect={handleTrackSelect}
          isPlaying={isPlaying}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
}

export default App;