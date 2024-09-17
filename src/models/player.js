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
    switch (direction) {
      case "ArrowUp":
        this.y = Math.max(0, this.y - this.speed);
        break;
      case "ArrowDown":
        this.y = Math.min(canvasHeight - this.size, this.y + this.speed);
        break;
      case "ArrowLeft":
        this.x = Math.max(0, this.x - this.speed);
        break;
      case "ArrowRight":
        this.x = Math.min(canvasWidth - this.size, this.x + this.speed);
        break;
    }
  }

  drawHealthBar(ctx) {
    console.log(this.health);
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
