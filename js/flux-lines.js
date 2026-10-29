(() => {
  const canvas = document.getElementById('flux-lines-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const host = canvas.parentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#3B82F6', '#60A5FA', '#FFFFFF'];
  let width = 1, height = 1, dpr = 1, raf = 0, time = 0, last = 0;
  const pointer = { x: -1000, y: -1000, inside: false };
  let swirl = { x: 0, y: 0, age: 99 };

  function resize() {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const lines = Math.max(28, Math.min(64, Math.floor(width / 15)));
    const spacing = height / (lines + 3);
    for (let i = 0; i < lines; i++) {
      const baseY = spacing * (i + 1.5);
      const hue = i % 7 === 0 ? colors[2] : colors[i % 2];
      ctx.beginPath();
      for (let x = -10; x <= width + 10; x += 5) {
        const nx = x / Math.max(width, 1);
        const waveA = Math.sin(nx * 8.2 + time * 0.72 + i * 0.22) * 13;
        const waveB = Math.sin(nx * 3.4 - time * 0.48 + i * 0.16) * 22;
        const waveC = Math.sin(nx * 14 + time * 0.3 + i * 0.31) * 4;
        let y = baseY + waveA + waveB + waveC;
        if (pointer.inside) {
          const dx = x - pointer.x, dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.exp(-(dist * dist) / (150 * 150));
          y += Math.sin(Math.atan2(dy, dx) + time) * pull * 30;
        }
        const age = swirl.age;
        if (age < 2.4) {
          const dx = x - swirl.x, dy = y - swirl.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          y += Math.sin(dist * .035 - age * 4) * Math.exp(-dist / 180) * (1 - age / 2.4) * 34;
        }
        if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = hue;
      ctx.globalAlpha = (i % 5 === 0 ? .25 : .12) + (i % 9 === 0 ? .08 : 0);
      ctx.lineWidth = i % 8 === 0 ? 1.2 : .65;
      ctx.shadowColor = hue; ctx.shadowBlur = i % 8 === 0 ? 9 : 4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }
  function animate(now) {
    raf = 0;
    if (document.hidden) return;
    const dt = last ? Math.min((now - last) / 1000, .05) : .016;
    last = now;
    if (!reduceMotion) time += dt;
    swirl.age += dt;
    draw();
    if (!reduceMotion) raf = requestAnimationFrame(animate);
  }
  function wake() { if (!raf && !reduceMotion && !document.hidden) raf = requestAnimationFrame(animate); }
  host.addEventListener('pointermove', e => { const r = host.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.inside = true; wake(); }, { passive: true });
  host.addEventListener('pointerleave', () => { pointer.inside = false; wake(); });
  host.addEventListener('pointerdown', e => { const r = host.getBoundingClientRect(); swirl = { x: e.clientX - r.left, y: e.clientY - r.top, age: 0 }; wake(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { last = 0; if (!document.hidden) { draw(); wake(); } });
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host); else window.addEventListener('resize', resize);
  resize();
  if (!reduceMotion) wake();
})();
