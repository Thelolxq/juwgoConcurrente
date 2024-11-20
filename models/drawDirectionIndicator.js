

export function drawDirectionIndicator(tank, ctx) {
    ctx.save();
    ctx.translate(tank.x, tank.y);
    ctx.rotate(tank.angle);
    ctx.beginPath();
    ctx.moveTo(tank.width / 2 + 5, 0);
    ctx.lineTo(tank.width / 2 + 25, 0);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}
