const playlist = [
  {
    title: "Song 1",
    artist: "Artist 1",
    audioFile: "audio1.mp3"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    audioFile: "audio2.mp3"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    audioFile: "audio3.mp3"
  },
  {
    title: "Song 4",
    artist: "Artist 4",
    audioFile: "audio4.mp3"
  },
  {
    title: "Song 5",
    artist: "Artist 5",
    audioFile: "audio5.mp3"
  }
];

let playlistIndex = 0;

const audio = new Audio();
audio.addEventListener("ended", () => {
  playlistIndex++;
  if (playlistIndex >= playlist.length) {
    playlistIndex = 0;
  }
  const nextSong = playlist[playlistIndex];
  audio.src = `audio/${nextSong.audioFile}`;
  audio.play();
});

// Agregar elementos de audio HTML al reproductor
playlist.forEach((song, index) => {
  const source = document.createElement("source");
  source.setAttribute("src", `audio/${song.audioFile}`);
  source.setAttribute("type", "audio/mpeg");
  audio.appendChild(source);
});

const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");

playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

const backwardBtn = document.querySelector("#backward");

backwardBtn.addEventListener("click", () => {
  playlistIndex--;
  if (playlistIndex < 0) {
    playlistIndex = playlist.length - 1;
  }
  const prevSong = playlist[playlistIndex];
  audio.src = `audio/${prevSong.audioFile}`;
  audio.play();
});


const forwardBtn = document.querySelector("#forward");

forwardBtn.addEventListener("click", () => {
  playlistIndex++;
  if (playlistIndex >= playlist.length) {
    playlistIndex = 0;
  }
  const nextSong = playlist[playlistIndex];
  audio.src = `audio/${nextSong.audioFile}`;
  audio.play();
});


const range = document.querySelector("#range");

range.addEventListener("change", () => {
  audio.volume = range.value / 100;
});

audio.addEventListener("timeupdate", () => {
  const audioDuration = audio.duration;
  const currentTime = audio.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const endMinutes = Math.floor(audioDuration / 60);
  const endSeconds = Math.floor(audioDuration % 60);

  document.querySelector(".start").innerHTML = `${minutes}:${seconds}`;
  document.querySelector(".end").innerHTML = `${endMinutes}:${endSeconds}`;
});

// Reproduce la primera canción de la lista
const firstSong = document.querySelector(`[data-index="${playlistIndex}"]`);
const firstSongData = playlist[playlistIndex];
audio.src = `audio/${firstSongData.audioFile}`;
document.querySelector("#song-title").innerHTML = firstSongData.title;
document.querySelector("#artist-name").innerHTML = firstSongData.artist;




