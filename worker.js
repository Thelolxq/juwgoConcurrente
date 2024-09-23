// worker.js
self.onmessage = function (e) {
    const { bullets, tank1, tank2, canvasWidth, canvasHeight } = e.data;
  
    const updatedBullets = bullets.map((bullet) => {
     
      bullet.x += Math.cos(bullet.angle) * bullet.speed;
      bullet.y += Math.sin(bullet.angle) * bullet.speed;
  
      
      if (bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight) {
        return null; 
      }
  
      
      const collisionWithTank1 = checkCollision(bullet, tank1);
      const collisionWithTank2 = checkCollision(bullet, tank2);
  
      if (collisionWithTank1) {
        postMessage({ hit: 'tank1' });
        return null; 
      }
  
      if (collisionWithTank2) {
        postMessage({ hit: 'tank2' });
        return null;
      }
  
      return bullet;
    }).filter(bullet => bullet !== null);
  
    postMessage({ bullets: updatedBullets });
  };
  
  function checkCollision(bullet, tank) {
    const tankLeft = tank.x - tank.width / 2.5;
    const tankRight = tank.x + tank.width / 2.5;
    const tankTop = tank.y - tank.height / 2.5;
    const tankBottom = tank.y + tank.height / 2.5;
  
    return (
      bullet.x >= tankLeft &&
      bullet.x <= tankRight &&
      bullet.y >= tankTop &&
      bullet.y <= tankBottom
    );
  }
  