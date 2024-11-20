export function drawPoints(ctx, tank1Points, tank2Points, tank1, tank2) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';

    const rectX = 5;
    const rectY = 10;
    const rectWidth = 220;
    const rectHeight = 125;

    ctx.fillStyle = 'white';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    ctx.fillStyle = 'black';
    ctx.fillText(`Tanque 1 Puntos: ${tank1Points}`, 10, 30);
    ctx.fillText(`Tanque 2 Puntos: ${tank2Points}`, 10, 60);
    ctx.fillText(`Vidas Tanque 1: ${tank1.lives}`, 10, 90);
    ctx.fillText(`Vidas Tanque 2: ${tank2.lives}`, 10, 120);
}
