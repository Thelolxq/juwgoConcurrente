export function drawHeart(heart, ctx, heartImage) {
    if (heart) {
        ctx.drawImage(heartImage, heart.x, heart.y, heart.width, heart.height);
    }
}
