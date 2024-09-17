export class ScoreManager {
  constructor() {
    this.score = 0;
  }

  increaseScore() {
    this.score += 1;
  }

  resetScore() {
    this.score = 0;
  }
}
