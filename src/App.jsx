// App.jsx - ACTUALIZADO Y CORREGIDO
import { useState, useRef, useEffect } from 'react';
import Header from './components/Header.jsx';
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';
import cover1 from './assets/img/cover1.jpg';
import cover2 from './assets/img/cover2.jpg';
import cover3 from './assets/img/cover3.jpg';
import cover4 from './assets/img/cover4.jpg';

function App() {
  const [beats, setBeats] = useState([
    { 
      id: 1, 
      title: "Tengo una Reina valera", 
      producer: "Producido por Zaeta Music", 
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
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef(new Audio(beats[currentTrackIndex].audioSrc));

  // Efecto para play/pause
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Playing audio");
          })
          .catch(error => {
            console.error("Error al reproducir:", error);
            setIsPlaying(false);
          });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Efecto para cambiar de canción
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = beats[currentTrackIndex].audioSrc;
    audio.load(); // Forzar la carga del nuevo archivo
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playing successfully");
          })
          .catch(error => {
            console.error("Error al cambiar de pista:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrackIndex, beats]);

  // Efecto para auto-siguiente cuando termina la canción
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleSongEnd = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % beats.length);
    };
    
    audio.addEventListener('ended', handleSongEnd);
    
    return () => {
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [beats.length]);

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
      <Header />
      <div id="beat-player">
        <Player 
          currentBeat={beats[currentTrackIndex]}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          audioRef={audioRef}
          producerImage={cover4}
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