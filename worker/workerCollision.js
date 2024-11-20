self.onmessage = function (e) {
    const { tank, heart } = e.data;

    if (
        heart &&
        tank.x < heart.x + heart.width &&
        tank.x + tank.width > heart.x &&
        tank.y < heart.y + heart.height &&
        tank.y + tank.height > heart.y
    ) {
        tank.lives++; 
        self.postMessage({ collision: true }); 
    } else {
        self.postMessage({ collision: false }); 
    }
};
