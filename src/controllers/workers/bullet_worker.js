let bullets = [];

self.onmessage = function (e) {
  const { action, data } = e.data;

  switch (action) {
    case "addBullet":
      // verifica que maximo tenga 4, de lo contrario se eliminan y se insertan nuevas
      if (bullets.length > 4) {
        bullets.forEach((_bullet, bulletsIndex) => {
          bullets.splice(bulletsIndex, 1);
        });
      } else {
        bullets.push({
          x: data.x,
          y: data.y,
          targetX: data.targetX,
          targetY: data.targetY,
          speed: data.speed || 1,
          damage: data.damage || 0.5,
        });
      }

      break;

    case "updateBullets":
      bullets.forEach((bullet) => {
        const dx = bullet.targetX - bullet.x;
        const dy = bullet.targetY - bullet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          bullet.x += (dx / distance) * bullet.speed;
          bullet.y += (dy / distance) * bullet.speed;
        }
      });

      bullets = bullets.filter(
        (bullet) =>
          bullet.x >= 0 && bullet.x <= 530 && bullet.y >= 0 && bullet.y <= 740
      );

      self.postMessage({ action: "updateBullets", bullets });
      break;
  }
};
