export function drawTank(tank, image, ctx) {
    ctx.save();
    ctx.translate(tank.x, tank.y);
    ctx.rotate(tank.angle);
    ctx.drawImage(image, -tank.width / 2, -tank.height / 2, tank.width, tank.height);
    ctx.restore();
}
