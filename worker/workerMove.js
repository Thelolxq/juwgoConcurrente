self.onmessage = function (e) {
    const { tank, keys, up, down, left, right, canvasWidth, canvasHeight } = e.data;
    
    if (keys[up]) {
        const newX = tank.x + Math.cos(tank.angle) * tank.speed;
        const newY = tank.y + Math.sin(tank.angle) * tank.speed;

        if (newX - tank.width / 2 >= 0 && newX + tank.width / 2 <= canvasWidth &&
            newY - tank.height / 2 >= 0 && newY + tank.height / 2 <= canvasHeight) {
            tank.x = newX;
            tank.y = newY;
        }
    }

    if (keys[down]) {
        const newX = tank.x - Math.cos(tank.angle) * tank.speed;
        const newY = tank.y - Math.sin(tank.angle) * tank.speed;

        if (newX - tank.width / 2 >= 0 && newX + tank.width / 2 <= canvasWidth &&
            newY - tank.height / 2 >= 0 && newY + tank.height / 2 <= canvasHeight) {
            tank.x = newX;
            tank.y = newY;
        }
    }

    if (keys[left]) {
        tank.angle -= 0.1;
    }
    if (keys[right]) {
        tank.angle += 0.1;
    }

    
    self.postMessage({ tank });
};
