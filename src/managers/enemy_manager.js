import { Enemy } from "../models/enemy.js";
import { ShootingEnemy } from "../models/ShootingEnemy.js";

export class EnemyManager {
  constructor(canvas, waveNumber, ctx) {
    this.canvas = canvas;
    this.waveNumber = waveNumber;
    this.enemies = [];
    this.ctx = ctx;
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
      const randomImg = Math.floor(Math.random() * 2);
      const x = Math.random() * (this.canvas.width - enemySize);
      const y = Math.random() * (this.canvas.height - enemySize);

      // Verifica que el número random sea menor a 3, es decir hay 30% de probabilidad que salga un enemigo que dispare
      const isShootingEnemy = Math.random() < 0.3;
      const enemy = isShootingEnemy
        ? new ShootingEnemy(
            x,
            y,
            3,
            "red",
            speed + this.waveNumber * 0.05,
            damage,
            size,
            health,
            1,
            3000
          )
        : new Enemy(
            x,
            y,
            randomImg,
            "red",
            speed + this.waveNumber * 0.05,
            damage,
            size,
            health
          );

      this.enemies.push(enemy);
    }
    return this.enemies;
  }

  verifyCollisionWithPlayer(enemies, player, gameOver) {
    enemies.forEach((enemy) => {
      enemy.draw(this.ctx);
      if (enemy instanceof ShootingEnemy) {
        // Actualiza movimiento y disparo de balas
        enemy.update(player);
      }

      if (enemy.hasCollidedWithPlayer(player)) {
        if (!enemy.hasDamagedPlayer && player.health >= 0) {
          player.health -= enemy.damage;
          enemy.hasDamagedPlayer = true;
        }

        if (player.health <= 0) {
          gameOver = true;
        }
      } else {
        enemy.hasDamagedPlayer = false;
      }
    });
    return gameOver;
  }
}
