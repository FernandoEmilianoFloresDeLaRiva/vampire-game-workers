export class CollisionManager {
  constructor(scoreManager, uiManager) {
    this.scoreManager = scoreManager;
    this.uiManager = uiManager;
  }
  // Choque entre enemigos y balas
  detectCollisions(bullets, enemies) {
    bullets.forEach((bullet, bulletIndex) => {
      enemies.forEach((enemy, enemyIndex) => {
        const dx = bullet.x - enemy.x;
        const dy = bullet.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= enemy.size) {
          enemy.health -= bullet.damage;
          this.uiManager.drawDamage(enemy.x, enemy.y, bullet.damage);
        }

        if (enemy.health <= 0) {
          enemies.splice(enemyIndex, 1);
          // Incrementa la puntuación
          this.scoreManager.increaseScore();
        }
      });

      bullets.splice(bulletIndex, 1);
    });
  }
}
