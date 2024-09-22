export class UIManager {
  constructor(ctx) {
    this.ctx = ctx;
    this.imgScore = new Image();
    this.imgScore.src = "../src/assets/images/icons/skull-icon.png";
    this.imgPowerUpHealth = new Image();
    this.imgPowerUpHealth.src = "../src/assets/images/icons/chicken-icon.png";
  }
  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  drawStatus(elapsedTime, waveNumber) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 20px Courier";
    this.ctx.fillText(`${this.formatTime(elapsedTime)}`, 245, 30);
    // this.ctx.fillText(`Oleada: ${waveNumber}`, 20, 30);
  }

  drawPowerUps(powerUps) {
    powerUps.forEach((powerUp) => {
      this.ctx.drawImage(this.imgPowerUpHealth, powerUp.x, powerUp.y, 13, 13);
    });
  }

  drawScore(score) {
    this.ctx.drawImage(this.imgScore, 480, 10, 25, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 20px Courier";
    this.ctx.fillText(`${score}`, 450, 32);
  }

  drawBullets(bullets, player) {
    bullets?.forEach((bullet) => {
      this.ctx.drawImage(player.imgGun, bullet.x, bullet.y, 16, 16);
    });
  }

  drawDamage(x, y, damage) {
    this.ctx.fillStyle = "red";
    this.ctx.font = "25px cormorant-bold";
    this.ctx.fillText(damage, x + 30, y + 10);
  }
}
