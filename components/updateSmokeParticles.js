

export function updateSmokeParticles(smokeParticles) {
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const particle = smokeParticles[i];
        particle.alpha -= 1 / particle.lifetime;
        particle.y -= 1;

        if (particle.alpha <= 0) {
            smokeParticles.splice(i, 1);
        }
    }
}
