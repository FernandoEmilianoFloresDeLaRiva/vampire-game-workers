export class Player {
  constructor(
    x,
    y,
    speed = 2,
    health = 130,
    playerImg = "../src/assets/gif/pasqualina-character.webp",
    playerWeapon = "../src/assets/images/guns/runetracer-gun.png"
  ) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speed = speed;
    this.health = health;
    this.maxHealth = health;
    this.image = new Image();
    this.image.src = playerImg;
    this.imgGun = new Image();
    this.imgGun.src = playerWeapon;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    this.drawHealthBar(ctx);
  }

  move(keyPressed, canvasWidth, canvasHeight) {
    // Movimiento diagonal arriba izquierda
    if (
      (keyPressed["w"] && keyPressed["a"]) ||
      (keyPressed["w"] && keyPressed["ArrowLeft"]) ||
      (keyPressed["ArrowUp"] && keyPressed["ArrowLeft"]) ||
      (keyPressed["ArrowUp"] && keyPressed["a"])
    ) {
      this.y = Math.max(0, this.y - this.speed);
      this.x = Math.max(0, this.x - this.speed);
      // Movimiento diagonal abajo izquierda
    } else if (
      (keyPressed["s"] && keyPressed["a"]) ||
      (keyPressed["s"] && keyPressed["ArrowLeft"]) ||
      (keyPressed["ArrowDown"] && keyPressed["ArrowLeft"]) ||
      (keyPressed["ArrowDown"] && keyPressed["a"])
    ) {
      this.y = Math.min(canvasHeight - this.size, this.y + this.speed);
      this.x = Math.max(0, this.x - this.speed);
      // Movimiento diagonal abajo derecha
    } else if (
      (keyPressed["s"] && keyPressed["d"]) ||
      (keyPressed["s"] && keyPressed["ArrowRight"]) ||
      (keyPressed["ArrowDown"] && keyPressed["ArrowRight"]) ||
      (keyPressed["ArrowDown"] && keyPressed["d"])
    ) {
      this.x = Math.min(canvasWidth - this.size, this.x + this.speed);
      this.y = Math.min(canvasHeight - this.size, this.y + this.speed);
      // Movimiento diagonal arriba derecha
    } else if (
      (keyPressed["w"] && keyPressed["d"]) ||
      (keyPressed["w"] && keyPressed["ArrowRight"]) ||
      (keyPressed["ArrowUp"] && keyPressed["ArrowRight"]) ||
      (keyPressed["ArrowUp"] && keyPressed["d"])
    ) {
      this.y = Math.max(0, this.y - this.speed);
      this.x = Math.min(canvasWidth - this.size, this.x + this.speed);
    } else if (keyPressed["w"] || keyPressed["ArrowUp"]) {
      this.y = Math.max(0, this.y - this.speed);
      return;
    } else if (keyPressed["s"] || keyPressed["ArrowDown"]) {
      this.y = Math.min(canvasHeight - this.size, this.y + this.speed);
      return;
    } else if (keyPressed["a"] || keyPressed["ArrowLeft"]) {
      this.x = Math.max(0, this.x - this.speed);
      return;
    } else if (keyPressed["d"] || keyPressed["ArrowRight"]) {
      this.x = Math.min(canvasWidth - this.size, this.x + this.speed);
      return;
    }
  }

  drawHealthBar(ctx) {
    const barWidth = this.size;
    const barHeight = 5;
    const barX = this.x;
    const barY = this.y + this.size + 5;

    const healthPercentage = this.health / this.maxHealth;
    const currentBarWidth = barWidth * healthPercentage;

    let barColor = "green";
    if (healthPercentage <= 0.5) {
      barColor = "yellow";
    }
    if (healthPercentage <= 0.2) {
      barColor = "red";
    }

    ctx.fillStyle = "gray";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, currentBarWidth, barHeight);
  }
}
