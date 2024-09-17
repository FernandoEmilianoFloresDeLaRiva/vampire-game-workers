function moveEnemiesTowardPlayer(player, enemies) {
  enemies.forEach((enemy) => {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    // Distancia entre el jugador y el enemigo
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Si la distancia es mayor a 0, mover el enemigo hacia el jugador
    if (dist > 0) {
      // Se mueve proporcionalmente en ambos ejes (x, y)
      enemy.x += (dx / dist) * enemy.speed;
      enemy.y += (dy / dist) * enemy.speed;
    }
  });
  return enemies;
}

// Escucha mensajes desde el hilo principal
self.onmessage = function (e) {
  const { player, enemies } = e.data;

  // Mueve los enemigos hacia la posición del jugador
  const updatedEnemies = moveEnemiesTowardPlayer(player, enemies);

  // Devuelve la lista actualizada de enemigos al hilo principal
  self.postMessage(updatedEnemies);
};
