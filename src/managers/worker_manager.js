export class WorkerManager {
  constructor() {
    this.enemyWorker = new Worker("./src/controllers/workers/enemy_worker.js");
    this.bulletWorker = new Worker(
      "./src/controllers/workers/bullet_worker.js"
    );
    this.waveWorker = new Worker("./src/controllers/workers/wave_worker.js");
    this.powerupWorker = new Worker(
      "./src/controllers/workers/powerUp_worker.js"
    );
  }

  initWorkers() {
    if (typeof this.enemyWorker !== "undefined") {
      console.log("Worker de enemigo cargado :D");
    }
    if (typeof this.bulletWorker !== "undefined") {
      console.log("Worker de balas cargado :D");
    }
    if (typeof this.waveWorker !== "undefined") {
      console.log("Worker de oleadas cargado :D");
    }
    if (typeof this.powerupWorker !== "undefined") {
      console.log("Worker de powerups cargado :D");
    }
  }

  postMessage(worker, message) {
    worker.postMessage(message);
  }

  onMessage(worker, callback) {
    worker.onmessage = callback;
  }
}
