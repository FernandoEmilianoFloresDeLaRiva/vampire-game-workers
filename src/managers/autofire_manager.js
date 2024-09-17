import { Bullet } from "../models/Bullet.js";

export class AutoFireManager {
  constructor(workerManager, player, enemies) {
    this.workerManager = workerManager;
    this.player = player;
    this.enemies = enemies;
  }

  autoFire() {
    // No dispara si no hay enemigos
    if (this.enemies.length === 0) return;

    // Seleccionar 4 enemigos aleatorios
    const selectedEnemies = [];
    while (
      selectedEnemies.length < 4 &&
      selectedEnemies.length < this.enemies.length
    ) {
      const randomIndex = Math.floor(Math.random() * this.enemies.length);
      if (!selectedEnemies.includes(this.enemies[randomIndex])) {
        selectedEnemies.push(this.enemies[randomIndex]);
      }
    }

    // Dispara 4 balas a los 4 enemigos seleccionados
    selectedEnemies.forEach((enemy) => {
      this.workerManager.postMessage(this.workerManager.bulletWorker, {
        action: "addBullet",
        data: new Bullet(this.player.x, this.player.y, enemy.x, enemy.y, 1, 1),
      });
    });
  }

  startAutoFire(interval = 2000) {
    setInterval(() => this.autoFire(), interval);
  }
}
