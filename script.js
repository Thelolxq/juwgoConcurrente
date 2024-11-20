import { drawBackground } from "./components/drawBackground.js";
import { drawMinimap } from "./components/drawMinimap.js";
import { drawPoints } from "./components/drawPoints.js";
import { drawSmokeParticles } from "./components/drawSmokeParticles.js";
import { drawBullets } from "./models/drawBullets.js";
import { drawDirectionIndicator } from "./models/drawDirectionIndicator.js";
import { drawHeart } from "./models/drawHeart.js";
import { drawTank } from "./models/drawTank.js";
import { drawInstructions } from "./components/drawInstruccion.js";
import { updateSmokeParticles } from "./components/updateSmokeParticles.js";
export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");
export const backgroundImage = new Image();
export const heartImage = new Image();
const worker = new Worker("./worker/worker.js");
const moveWorkerTank1 = new Worker("./worker/workerMove.js");
const moveWorkerTank2 = new Worker("./worker/workerMove.js");
const heartCollisionWorkerTank1 = new Worker("./worker/workerCollision.js");
const heartCollisionWorkerTank2 = new Worker("./worker/workerCollision.js");
const tank1Image = new Image();
const tank2Image = new Image();
tank1Image.src = "./assets/tanque1.png";
tank2Image.src = "./assets/tanque2.png";
heartImage.src = "./assets/corazon.png";
backgroundImage.src = "./assets/fondo.png";
export let heart = null;
let heartTimer = 0;
const heartSpawnTime = 20000;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
export const tank1 = {
  width: 60,
  height: 30,
  angle: 0,
  speed: 1,
  lives: 5,
};
export const tank2 = {
  width: 60,
  height: 30,
  angle: 0,
  speed: 1,
  lives: 5,
};
export const bullets = [];
export let tank1Points = 0;
export let tank2Points = 0;
function spawnHeart() {
  heart = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 20,
    height: 20,
  };
}
function checkHeartCollisionWithWorker(tank, worker) {
  if (heart) {
    worker.postMessage({ tank, heart });

    worker.onmessage = function (e) {
      if (e.data.collision) {
        tank.lives++;
        heart = null;
      }
    };
  }
}
export const minimapHeartSize = 2;
export const smokeParticles = [];
function createSmokeParticle(x, y) {
  return {
    x: x,
    y: y,
    size: Math.random() * 5 + 2,
    alpha: 1,
    lifetime: Math.random() * 30 + 20,
  };
}
let gameActive = true;
function checkGameOver() {
  if (tank1.lives <= 0 && gameActive) {
    alert("Tanque 2 ha ganado!");
    gameActive = false;
  } else if (tank2.lives <= 0 && gameActive) {
    alert("Tanque 1 ha ganado!");
    gameActive = false;
  }
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(ctx, backgroundImage, canvas);
  drawTank(tank1, tank1Image, ctx);
  drawDirectionIndicator(tank1, ctx);
  drawTank(tank2, tank2Image, ctx);
  drawDirectionIndicator(tank2, ctx);
  drawBullets(bullets, ctx);
  drawPoints(ctx, tank1Points, tank2Points, tank1, tank2);
  drawMinimap(
    canvas,
    ctx,
    backgroundImage,
    tank1,
    tank2,
    heart,
    minimapHeartSize
  );
  drawHeart(heart, ctx, heartImage);
  drawInstructions(ctx, canvas);
  checkHeartCollisionWithWorker(tank1, heartCollisionWorkerTank1);
  checkHeartCollisionWithWorker(tank2, heartCollisionWorkerTank2);
  updateBullets();
  updateSmokeParticles(smokeParticles);
  drawSmokeParticles(ctx, smokeParticles);
  checkGameOver();
}
worker.onmessage = function (e) {
  if (e.data.bullets) {
    bullets.length = 0;
    bullets.push(...e.data.bullets);
  }
  if (e.data.hit === "tank1") {
    tank1Points++;
    tank1.lives--;
  } else if (e.data.hit === "tank2") {
    tank2Points++;
    tank2.lives--;
  }
};
function updateBullets() {
  worker.postMessage({
    bullets,
    tank1,
    tank2,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  });
}
const keys = {};
function moveTank(tank, up, down, left, right, moveWorker) {
  moveWorker.postMessage({
    tank,
    keys,
    up,
    down,
    left,
    right,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  });
  moveWorker.onmessage = function (e) {
    let updatedTank = e.data.tank;
    if (updatedTank) {
      tank.x = updatedTank.x;
      tank.y = updatedTank.y;
      tank.angle = updatedTank.angle;

      if (
        (keys[up] || keys[down] || keys[left] || keys[right]) &&
        tank.lives <= 3
      ) {
        smokeParticles.push(createSmokeParticle(tank.x, tank.y));
      }
    }
  };
}
function shoot(tank) {
  const bullet = {
    x: tank.x + Math.cos(tank.angle) * (tank.width / 2 + 5),
    y: tank.y + Math.sin(tank.angle) * (tank.width / 2 + 5),
    width: 5,
    height: 10,
    angle: tank.angle,
    speed: 5,
  };
  bullets.push(bullet);
}
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === "Enter") {
    shoot(tank1);
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    shoot(tank2);
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
window.addEventListener("keydown", (e) => {
  if (e.key === "r" && !gameActive) {
    resetGame();
    gameActive = true;
    gameLoop();
  }
});
function gameLoop() {
  if (!gameActive) return alert("presiona R para comenzar");
  moveTank(
    tank1,
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    moveWorkerTank1
  );
  moveTank(tank2, "w", "s", "a", "d", moveWorkerTank2);
  heartTimer += 16.67;
  if (heartTimer >= heartSpawnTime) {
    spawnHeart();
    heartTimer = 0;
  }
  update();
  requestAnimationFrame(gameLoop);
}
function getRandomPosition(tankWidth, tankHeight) {
  const x = Math.random() * (canvas.width - tankWidth) + tankWidth / 2;
  const y = Math.random() * (canvas.height - tankHeight) + tankHeight / 2;
  return { x, y };
}
function resetGame() {
  const randomPosition1 = getRandomPosition(tank1.width, tank1.height);
  const randomPosition2 = getRandomPosition(tank2.width, tank2.height);
  tank1.x = randomPosition1.x;
  tank1.y = randomPosition1.y;
  tank1.angle = 0;
  tank1.lives = 5;
  tank1Points = 0;

  tank2.x = randomPosition2.x;
  tank2.y = randomPosition2.y;
  tank2.angle = 0;
  tank2.lives = 5;
  tank2Points = 0;
  bullets.length = 0;
}
backgroundImage.onload = () => {
  resetGame();
  gameLoop();
};
