export class Enemy {
  static images = [
    "../src/assets/gif/Sprite-BAT1.webp",
    "../src/assets/gif/Sprite-MILK.webp",
    "../src/assets/gif/Sprite-MOLISANO_VECCHIO.webp",
  ].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  constructor(x, y, imgNum, color, speed, damage = 10, size = 60, health = 100) {
    this.x = x;
    this.y = y;
    this.imgNum = imgNum;
    this.color = color;
    this.speed = speed;
    this.size = size;
    this.health = health;
    this.damage = damage;
  }

  draw(ctx) {
    const img = Enemy.images[this.imgNum];
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }
  moveTowardPlayer(player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
  }

  hasCollidedWithPlayer(player) {
    return (
      Math.abs(this.x - player.x) < this.size - 30 &&
      Math.abs(this.y - player.y) < this.size - 40
    );
  }
}
