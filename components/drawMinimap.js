export function drawMinimap(canvas, ctx, backgroundImage, tank1, tank2, heart, minimapHeartSize) {
    const minimapX = canvas.width - 150;
    const minimapY = 10;
    const minimapWidth = 140;
    const minimapHeight = 100;
    const scaleX = minimapWidth / canvas.width;
    const scaleY = minimapHeight / canvas.height;

    ctx.drawImage(backgroundImage, minimapX, minimapY, minimapWidth, minimapHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(minimapX, minimapY, minimapWidth, minimapHeight);

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(minimapX + tank1.x * scaleX, minimapY + tank1.y * scaleY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(minimapX + tank2.x * scaleX, minimapY + tank2.y * scaleY, 5, 0, Math.PI * 2);
    ctx.fill();
    if (heart) {
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.arc(minimapX + heart.x * scaleX, minimapY + heart.y * scaleY, minimapHeartSize, 0, Math.PI * 2);
        ctx.fill();
    }
}
