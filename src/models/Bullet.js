export class Bullet {
  constructor(x, y, targetX, targetY, damage = 0.5, speed = 1) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.speed = speed;
  }
}
