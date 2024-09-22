import { Enemy } from "../models/enemy.js";

export class EnemyManager {
  constructor(canvas, waveNumber) {
    this.canvas = canvas;
    this.waveNumber = waveNumber;
    this.enemies = [];
  }

  generateEnemies(
    numberOfEnemies,
    speed = 0.65,
    damage = 15,
    size = 55,
    health = 100
  ) {
    this.enemies = [];
    const enemySize = 20;
    for (let i = 0; i < numberOfEnemies; i++) {
      const randomImg = Math.floor(Math.random() * 3);

      const x = Math.random() * (this.canvas.width - enemySize);
      const y = Math.random() * (this.canvas.height - enemySize);
      const enemy = new Enemy(
        x,
        y,
        randomImg,
        "red",
        // speed
        speed + this.waveNumber * 0.05,
        // damage
        damage,
        // size
        size,
        // health
        health
      );
      this.enemies.push(enemy);
    }
    return this.enemies;
  }
}
