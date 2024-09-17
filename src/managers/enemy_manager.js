import { Enemy } from "../models/enemy.js";

export class EnemyManager {
  constructor(canvas, waveNumber) {
    this.canvas = canvas;
    this.waveNumber = waveNumber;
    this.enemies = [];
  }

  generateEnemies(numberOfEnemies) {
    this.enemies = [];
    const enemySize = 20;
    for (let i = 0; i < numberOfEnemies; i++) {
      const x = Math.random() * (this.canvas.width - enemySize);
      const y = Math.random() * (this.canvas.height - enemySize);
      const randomImg = Math.floor(Math.random() * 3);
      const enemy = new Enemy(
        x,
        y,
        randomImg,
        "red",
        0.65 + this.waveNumber * 0.05
      );
      this.enemies.push(enemy);
    }
    return this.enemies;
  }
}
