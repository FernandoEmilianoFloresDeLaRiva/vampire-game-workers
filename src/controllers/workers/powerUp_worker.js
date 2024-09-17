let powerUps = [];
const POWER_UP_PROBABILITY = 7;

self.onmessage = function (e) {
  const { action, widthCanvas, heightCanvas } = e.data;

  if (action === "generatePowerUps") {
    const probability = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
    if (probability === POWER_UP_PROBABILITY) {
      if (powerUps.length > 3) {
        return;
      } else {
        generatePowerUp(widthCanvas, heightCanvas);
      }
    }
    self.postMessage({
      action: "updatePowerUps",
      powerUps,
    });
  } else if (action === "deletePower") {
    const { powerUpIndex } = e.data;
    powerUps.splice(powerUpIndex, 1);
  }
};

// Función para generar un nuevo power-up
function generatePowerUp(width, height) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const type = "health";
  powerUps.push({ x, y, type });
}
