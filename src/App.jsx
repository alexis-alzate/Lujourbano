import { useState, useRef, useEffect } from 'react';
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx'; // <-- VOLVEMOS A IMPORTAR EL PLAYER ORIGINAL
import ProducerHeader from './components/ProducerHeader.jsx';
import cover1 from './assets/img/cover1.jpg';
import cover2 from './assets/img/cover2.jpg';
import cover3 from './assets/img/cover3.jpg';
import cover4 from './assets/img/cover4.jpg'; 

function App() {
  const [beats, setBeats] = useState([
    { id: 1, title: "Tengo una Reina valera", producer: "Producido por Zaeta Music", artist: "Jesus Family", audioSrc: "/audio/Reina_valera.mp3", coverSrc: cover1, genre: "Trap", spotifyUrl: "https://open.spotify.com/intl-es/track/5YIiEZRb3TU1U5LMs7FRsN" },
    { id: 2, title: "Hoy me levante", producer: "Producido por Zaeta Music", artist: "Polimaba", audioSrc: "/audio/Hoy me levante.mp3", coverSrc: cover2, genre: "Trap", spotifyUrl: "https://open.spotify.com/intl-es/album/19v1XTZ87SSchYjYAiEbWs" },
    { id: 3, title: "Mano arriba", producer: "Producido por Zaeta Music", artist: "Julian Ramos", audioSrc: "/audio/Mano arrimba.wav", coverSrc: cover3, genre: "Trap", spotifyUrl: "https://open.spotify.com/intl-es/album/6kih0fAozoCEncepF8PhuI" }
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
  
  const handleTrackSelect = (beatId) => {
    const trackIndex = beats.findIndex(beat => beat.id === beatId);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(true);
    }
  };

  const filteredBeats = beats
    .map((beat, index) => ({ ...beat, originalIndex: index }))
    .filter(beat =>
      beat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="window-container">
   <ProducerHeader producerName="ZaetaMusic" producerImageSrc={cover4} />
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