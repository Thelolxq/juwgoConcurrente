export function drawBullets(bullets, ctx) {
    bullets.forEach(bullet => {
        ctx.save();
        ctx.translate(bullet.x, bullet.y);
        ctx.rotate(bullet.angle);
        ctx.fillStyle = 'red';
        ctx.fillRect(-bullet.width / 2, -bullet.height / 2, bullet.width, bullet.height);
        ctx.restore();
    });
}
