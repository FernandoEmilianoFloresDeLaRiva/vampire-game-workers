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

  move(direction, canvasWidth, canvasHeight) {
    console.log(direction);
    if (direction === "w" || direction === "ArrowUp") {
      this.y = Math.max(0, this.y - this.speed);
      return;
    } else if (direction === "s" || direction === "ArrowDown") {
      this.y = Math.min(canvasHeight - this.size, this.y + this.speed);
      return;
    } else if (direction === "a" || direction === "ArrowLeft") {
      this.x = Math.max(0, this.x - this.speed);
      return;
    } else if (direction === "d" || direction === "ArrowRight") {
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
