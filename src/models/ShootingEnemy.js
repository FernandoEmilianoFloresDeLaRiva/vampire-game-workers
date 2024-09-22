import { Enemy } from "./enemy.js";

export class ShootingEnemy extends Enemy {
    static bulletImg = [
        "../../src/assets/images/guns/undead-image-bullet.webp"
      ].map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });
  constructor(
    x,
    y,
    imgNum,
    color,
    speed,
    damage = 10,
    size = 60,
    health = 100,
    bulletSpeed = 1,
    fireRate = 3000,
  ) {
    super(x, y, imgNum, color, speed, damage, size, health);
    this.bulletSpeed = bulletSpeed;
    this.fireRate = fireRate;
    this.bullets = [];
    this.lastShotTime = Date.now();
  }

  shoot(player) {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime >= this.fireRate) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Bala que se mueve hacia el jugador
      this.bullets.push({
        x: this.x,
        y: this.y,
        vx: (dx / dist) * this.bulletSpeed,
        vy: (dy / dist) * this.bulletSpeed,
        damage: 15,
      });

      this.lastShotTime = currentTime;
    }
  }

  updateBullets(player) {
    this.bullets.forEach((bullet, index) => {
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      if (this.bulletHitsPlayer(bullet, player)) {
        console.log(player.health)
        player.health -= bullet.damage; 
        this.bullets.splice(index, 1); 
      }
    });

    // Borra balas que están fuera del canvas
    this.bullets = this.bullets.filter(
      (bullet) =>
        bullet.x >= 0 && bullet.x <= 530 && bullet.y >= 0 && bullet.y <= 740
    );
  }

  bulletHitsPlayer(bullet, player) {
    const dx = bullet.x - player.x;
    const dy = bullet.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < player.size / 2 + 5; 
  }

  draw(ctx) {
    super.draw(ctx);
    this.bullets.forEach((bullet) => {
        ctx.drawImage(ShootingEnemy.bulletImg[0], bullet.x, bullet.y, 40, 40);
    });
  }

  update(player) {
    this.shoot(player);
    this.updateBullets(player);
  }
}
