export class PowerUpManager {
  constructor(workerManager) {
    this.workerManager = workerManager;
  }

  handlePowerUps(player, powerUps) {
    powerUps.forEach((powerUp, powerUpIndex) => {
      // Detectar colisión entre el jugador y el power-up
      const dist = Math.hypot(player.x - powerUp.x, player.y - powerUp.y);
      if (dist < 20) {
        if (powerUp.type === "health") {
          player.health += 10;
          this.workerManager.postMessage(this.workerManager.powerupWorker, {
            action: "deletePower",
            data: { id: powerUpIndex },
          });
          if (player.health > player.maxHealth) {
            // Limitar la salud máxima
            player.health = player.maxHealth;
          }
        }
      }
    });
  }
}
