describe("Audio Player", () => {
    let audioPlayer;
    let playBtn;
    let pauseBtn;
    let forwardBtn;
    let backwardBtn;
    let range;
    
    beforeEach(() => {
      // Configurar el reproductor de audio y los botones antes de cada prueba
      fixture.load("audio-player.html");
      audioPlayer = document.getElementById("audio-player");
      playBtn = document.querySelector(".play-btn");
      pauseBtn = document.querySelector(".pause-btn");
      forwardBtn = document.querySelector("#forward");
      backwardBtn = document.querySelector("#backward");
      range = document.querySelector("#range");
    });
    
    afterEach(() => {
      // Limpiar el reproductor de audio y los botones después de cada prueba
      fixture.cleanup();
      audioPlayer = null;
      playBtn = null;
      pauseBtn = null;
      forwardBtn = null;
      backwardBtn = null;
      range = null;
    });
    
    describe("Play button", () => {
      it("debe reproducir el audio cuando se hace clic", () => {
        playBtn.click();
        expect(audioPlayer.paused).toBe(false);
      });
      
      it("debe ocultar el botón de reproducción y mostrar el botón de pausa cuando se hace clic", () => {
        playBtn.click();
        expect(playBtn.classList.contains("hide")).toBe(true);
        expect(pauseBtn.classList.contains("hide")).toBe(false);
      });
    });
    
    describe("Pause button", () => {
      it("debe pausar el audio cuando se hace clic", () => {
        pauseBtn.click();
        expect(audioPlayer.paused).toBe(true);
      });
      
      it("debe ocultar el botón de pausa y mostrar el botón de reproducción cuando se hace clic", () => {
        pauseBtn.click();
        expect(pauseBtn.classList.contains("hide")).toBe(true);
        expect(playBtn.classList.contains("hide")).toBe(false);
      });
    });
    
    describe("Forward button", () => {
      it("debe reproducir la siguiente canción en la lista de reproducción cuando se hace clic", () => {
        const initialSongIndex = audioPlayer.dataset.index;
        const initialSongData = playlist[initialSongIndex];
        forwardBtn.click();
        const nextSongIndex = audioPlayer.dataset.index;
        const nextSongData = playlist[nextSongIndex];
        expect(audioPlayer.src).toBe(`audio/${nextSongData.audioFile}`);
        expect(document.querySelector("#song-title").innerHTML).toBe(nextSongData.title);
        expect(document.querySelector("#artist-name").innerHTML).toBe(nextSongData.artist);
        expect(initialSongIndex).not.toBe(nextSongIndex);
      });
      

      it("debe comenzar a reproducir la primera canción en la lista de reproducción cuando se reproduce la última canción", () => {
        // Forzar a que el reproductor esté reproduciendo la última canción de la lista de reproducción
        const lastSong = playlist[playlist.length - 1];
        audio.src = `audio/${lastSong.audioFile}`;
        audio.play();
        playlistIndex = playlist.length - 1;
      
        // Simular el evento 'ended' para que se reproduzca la primera canción después de que la última canción termine
        const endedEvent = new Event("ended");
        audio.dispatchEvent(endedEvent);
      
      it("Verificar que se esté reproduciendo la primera canción en la lista", () => {
        const firstSong = playlist[0];
        expect(audio.src).toBe(`audio/${firstSong.audioFile}`);
        expect(playlistIndex).toBe(0);

      });
        

        
    
