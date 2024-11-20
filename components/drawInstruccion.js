
export function drawInstructions(ctx, canvas) {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';

   
    const rectX = canvas.width - 450;
    const rectY = canvas.height - 100;
    const rectWidth = 4500;
    const rectHeight = 90;

    ctx.fillStyle = 'white';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    ctx.fillStyle = 'black';
    ctx.fillText('Tanque 1 (Azul)', rectX + 10, rectY + 20);
    ctx.fillText('Mover: Flechas ↑ ↓ ← →', rectX + 10, rectY + 40);
    ctx.fillText('Disparar: Enter', rectX + 10, rectY + 60);

    ctx.fillText('Tanque 2 (Rojo)', rectX + 200, rectY + 20);
    ctx.fillText('Mover: W A S D', rectX + 200, rectY + 40);
    ctx.fillText('Disparar: Barra Espaciadora', rectX + 200, rectY + 60);
}
