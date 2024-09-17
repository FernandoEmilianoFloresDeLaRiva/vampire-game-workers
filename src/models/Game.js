import { WorkerManager } from "../managers/worker_manager.js";
import { EnemyManager } from "../managers/enemy_manager.js";
import { CollisionManager } from "../managers/collision_manager.js";
import { UIManager } from "../managers/ui_manager.js";
import { AutoFireManager } from "../managers/autofire_manager.js";
import { ScoreManager } from "../managers/score_manager.js";
import { PowerUpManager } from "../managers/powerUp_manager.js";
import { MusicManager } from "../managers/music_manager.js";

export class Game {
  constructor(canvas, ctx, player) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = player;
    this.bullets = [];
    this.powerUps = [];
    this.waveNumber = 1;
    this.gameOver = false;
    this.startTime = Date.now();
    this.enemies = [];
    this.enemyManager = new EnemyManager(this.canvas, this.waveNumber);
    this.workerManager = new WorkerManager();
    this.scoreManager = new ScoreManager();
    this.uiManager = new UIManager(this.ctx);
    this.collisionManager = new CollisionManager(
      this.scoreManager,
      this.uiManager
    );
    this.autoFireManager = null;
    this.powerUpManager = new PowerUpManager(this.workerManager);
    this.musicManager = new MusicManager();
  }

  init() {
    this.workerManager.initWorkers();
    this.enemies = this.enemyManager.generateEnemies(12);
    this.autoFireManager = new AutoFireManager(
      this.workerManager,
      this.player,
      this.enemies
    );
    this.autoFireManager.startAutoFire(2000);
    this.musicManager.playMusic();
    this.setupEventListeners();
    this.startGameLoop();
    this.updateGame();
  }

  setupEventListeners() {
    // Listeners para workers
    this.workerManager.onMessage(this.workerManager.bulletWorker, (e) =>
      this.handleBulletUpdates(e)
    );
    this.workerManager.onMessage(this.workerManager.waveWorker, (e) =>
      this.handleWaveUpdates(e)
    );
    this.workerManager.onMessage(this.workerManager.enemyWorker, (e) =>
      this.handleEnemyUpdates(e)
    );
    this.workerManager.onMessage(this.workerManager.powerupWorker, (e) =>
      this.handlePowerUpUpdates(e)
    );

    document.addEventListener("keydown", (event) => {
      this.player.move(event.key, this.canvas.width, this.canvas.height);
    });

    // Eventos para el modal
    document
      .getElementById("restartGame")
      .addEventListener("click", () => this.restartGame());
    document
      .getElementById("closeModal")
      .addEventListener("click", () => window.location.reload());
  }

  handleBulletUpdates(e) {
    const { action, bullets: updatedBullets } = e.data;
    if (action === "updateBullets") {
      this.bullets = updatedBullets;
    }
  }

  handleWaveUpdates(e) {
    const { newWave, waveNumber: newWaveNumber } = e.data;
    if (newWave) {
      this.waveNumber = newWaveNumber;
      this.enemies = this.enemyManager.generateEnemies(10 + newWaveNumber * 3);
    }
  }

  handleEnemyUpdates(e) {
    const enemyData = e.data;
    this.enemies = this.enemies.map((enemy, index) => {
      enemy.x = enemyData[index]?.x;
      enemy.y = enemyData[index]?.y;
      return enemy;
    });
  }

  handlePowerUpUpdates(e) {
    const { action, powerUps: updatedPowerUps } = e.data;
    if (action === "updatePowerUps") {
      this.powerUps = updatedPowerUps;
    }
  }

  restartGame() {
    this.hideGameOverModal();
    this.player.health = this.player.maxHealth;
    this.scoreManager.resetScore();
    this.waveNumber = 1;
    this.enemies = this.enemyManager.generateEnemies(12);
    this.bullets = [];
    this.powerUps = [];
    this.startTime = Date.now();
    this.gameOver = false;
    this.musicManager.playMusic();
    this.updateGame();
  }

  checkGameOver() {
    if (this.player.health <= 0) {
      this.showGameOverModal();
      this.musicManager.stopMusic();
    }
  }

  updateGame() {
    if (this.gameOver) {
      this.checkGameOver();
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.startTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);

    this.uiManager.drawBullets(this.bullets, this.player);

    this.enemies.forEach((enemy) => {
      enemy.draw(this.ctx);

      if (enemy.hasCollidedWithPlayer(this.player)) {
        if (!enemy.hasDamagedPlayer && this.player.health !== 0) {
          this.player.health -= 5;
          enemy.hasDamagedPlayer = true;
        }

        if (this.player.health <= 0) {
          this.gameOver = true;
        }
      } else {
        enemy.hasDamagedPlayer = false;
      }
    });

    this.collisionManager.detectCollisions(this.bullets, this.enemies);

    this.workerManager.postMessage(this.workerManager.bulletWorker, {
      action: "updateBullets",
    });

    this.workerManager.postMessage(this.workerManager.waveWorker, {
      enemies: this.enemies,
      waveNumber: this.waveNumber,
    });

    this.workerManager.postMessage(this.workerManager.powerupWorker, {
      action: "generatePowerUps",
      widthCanvas: this.canvas.width,
      heightCanvas: this.canvas.height,
    });

    this.uiManager.drawStatus(elapsedTime, this.waveNumber);
    this.uiManager.drawPowerUps(this.powerUps);
    this.uiManager.drawScore(this.scoreManager.score);

    this.powerUpManager.handlePowerUps(this.player, this.powerUps);

    window.requestAnimationFrame(() => this.updateGame());
  }

  startGameLoop() {
    setInterval(() => {
      const playerData = { x: this.player.x, y: this.player.y };

      this.workerManager.postMessage(this.workerManager.enemyWorker, {
        player: playerData,
        enemies: this.enemies,
      });

      this.workerManager.postMessage(this.workerManager.bulletWorker, {
        action: "updateBullets",
      });
      // Se actualiza cada 60 seg
    }, 1000 / 60);
  }

  showGameOverModal() {
    document.getElementById("gameOverModal").style.display = "flex";
  }

  hideGameOverModal() {
    document.getElementById("gameOverModal").style.display = "none";
  }
}
