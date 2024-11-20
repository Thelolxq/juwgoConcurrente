export function drawSmokeParticles(ctx, smokeParticles ) {
    ctx.fillStyle = 'rgba(200, 200, 200, 1)';
    smokeParticles.forEach(particle => {
        ctx.fillStyle = `rgba(200, 200, 200, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
}
