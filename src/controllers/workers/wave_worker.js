let waveNumber = 1;
// Intervalo entre oleadas en ms
const waveInterval = 12000;
let lastWaveTime = Date.now();

self.onmessage = function (e) {
  const { enemies, waveNumber: numberOfWave } = e.data;
  console.log(enemies);
  waveNumber = numberOfWave;
  const now = Date.now();
  let newWave = false;

  if (now - lastWaveTime >= waveInterval) {
    waveNumber++;
    lastWaveTime = now;
    newWave = true;
  }

  self.postMessage({ newWave, waveNumber });
};
