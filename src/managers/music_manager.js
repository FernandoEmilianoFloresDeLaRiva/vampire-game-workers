export class MusicManager {
  constructor() {
    this.options = [
      "../src/assets/audio/Before_Concession.mp3",
      "../src/assets/audio/Gaze_Up_at_the_Stars.mp3",
      "../src/assets/audio/Reincarnated_Echoes.mp3",
    ];
    this.randomPath = Math.floor(Math.random() * 3);
    this.backgroundMusic = new Audio(this.options[this.randomPath]);
    this.backgroundMusic.loop = true;
  }

  playMusic() {
    this.backgroundMusic.play();
  }

  pauseMusic() {
    this.backgroundMusic.pause();
  }

  stopMusic() {
    this.backgroundMusic.pause();
    // Reinicia la música
    this.backgroundMusic.currentTime = 0;
  }
}
