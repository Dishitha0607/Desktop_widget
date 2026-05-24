import { useEffect, useRef, useState } from "react";
// import music from "./assets/lofi.mp3";

function App() {
  const songs = [
    {
      title: "Raabta",
      artist: "Arijit Singh",
      src: "./song1.mp3",
      cover: "./sky.jpg",
    },
    {
      title: "Finding Her",
      artist: "Bharath Srinivasan",
      src: "./song2.mp3",
      cover: "./finding-her.png",
    },
    {
      title: "Jhol",
      artist: "Annural Khalid and Maanu",
      src: "./song3.mp3",
      cover: "./jhol-img.png",
    },
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };
  const prevSong = () => {
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };
  // auto play when song chnages
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // time formatting
  const formatTime = (time) => {
    if (isNaN(time)) return "0.00";

    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // progress of the music
  const handleProgress = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetaData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <>
      <div className="app">
        <div className="widget">
          <h1>Cozy Notes✨</h1>
          <img src="./cat.jpg" alt="cat" className="cat" />

          <textarea
            placeholder="write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => {
              if (text.trim() === "") return;
              setNotes([...notes, text]);
              setText("");
            }}
          >
            Add Note
          </button>

          <div className="notes">
            {notes.map((note, index) => (
              <div className="note-card" key={index}>
                <p>{note}</p>

                <button
                  className="btn delete-btn"
                  onClick={() => {
                    setNotes(notes.filter((_, i) => i !== index));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/*----------------- Music-Player ---------------------*/}
        <div className="music-player">
          {/* Header */}
          <div className="player-header">
            <img src="./heart.png" alt="heart-pixel" className="heart" /> {"  "}NOW
            PLAYING{"   "}
            <img src="./heart.png" alt="heart-pixel" className="heart" />
          </div>

          {/* Record Section */}
          <div className="record-sec">
            <div className={`record-wrapper ${isPlaying ? "spin" : ""}`}>
              <img
                src="./side-heart.png"
                alt="side-heart"
                className="side-heart"
              />
              <img
                src="./wheel.png"
                alt="record-img"
                className={isPlaying ? "record-img spinning" : "record-img"}
              />
              <img src="./handle.png" alt="handle" className="handle" />
            </div>
          </div>

          {/* Music playing */}
          <div className="music-info">
            <div className="song-details">
              <img
                src={songs[currentSong].cover}
                alt="song-album"
                className="album-cover"
              />

              <div className="song-text">
                <h2>
                  {songs[currentSong].title} <img src="./heart.png" />
                </h2>
                <p>{songs[currentSong].artist}</p>
              </div>
            </div>

            <div className="time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="progress-bar" onClick={handleSeek}>
              <div
                className="progress"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
              <img
                src="./slidder.png"
                alt="progress-circle"
                className="progress-circle"
                style={{
                  left: `${(currentTime / duration) * 100}%`,
                }}
              />
            </div>

            <div className="controls">
              <button className="side-btn" onClick={prevSong}>
                <img src="./prev.png" alt="previous" />
              </button>
              <button
                className="main-play"
                onClick={() => {
                  if (isPlaying) {
                    audioRef.current.pause();
                  } else {
                    audioRef.current.play();
                  }

                  setIsPlaying(!isPlaying);
                }}
              >
                <img src={isPlaying ? "./play.png" : "./pause.png"} alt="" />
              </button>
              <button className="side-btn" onClick={nextSong}>
                <img src="./next.png" alt="next" />
              </button>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={songs[currentSong].src}
            onTimeUpdate={handleProgress}
            onLoadedMetadata={handleLoadedMetaData}
          />
        </div>
      </div>
    </>
  );
}

export default App;
