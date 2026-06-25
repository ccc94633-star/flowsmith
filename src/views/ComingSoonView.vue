<template>
  <main class="coming-soon-wrap">
    <div class="coming-soon-card">
      <p class="eyebrow">Coming Soon</p>
      <h1>程式開發中</h1>
      <p class="subtitle">請持續關注，即將推出</p>
      <a class="button" href="#">← 返回首頁</a>
    </div>
  </main>
</template>

<style scoped>
.coming-soon-wrap {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background:
    linear-gradient(rgba(251, 246, 230, .58), rgba(220, 233, 213, .72)),
    url("../images/background-imgs/treeSky2.jpg") center / cover fixed;
}

.coming-soon-card {
  width: min(560px, 100%);
  padding: 56px 48px;
  text-align: center;
  background: rgba(255, 255, 250, .88);
  border: 1px solid rgba(255, 255, 255, .9);
  border-radius: 24px;
  box-shadow: 0 24px 72px rgba(45, 67, 54, .18);
  backdrop-filter: blur(20px);
}

.eyebrow {
  margin-bottom: 14px;
  color: var(--gold-deep);
  font-family: Silkscreen, Inter, sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: .12em;
  text-transform: uppercase;
}

h1 {
  margin-bottom: 16px;
  color: var(--green);
  font-family: "Baloo 2", "Noto Sans TC", sans-serif;
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.15;
}

.subtitle {
  margin-bottom: 36px;
  color: var(--muted);
  font-family: "Noto Sans TC", Inter, sans-serif;
  font-size: 16px;
  line-height: 1.7;
}

.button {
  min-height: 44px;
  padding: 9px 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fffefa;
  background: var(--green);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  font: inherit;
  font-weight: 800;
}

.button:hover {
  background: #1f352b;
}

@media (max-width: 680px) {
  .coming-soon-wrap {
    min-height: 100dvh;
    padding: 16px;
    align-items: center;
  }

  .coming-soon-card {
    padding: 40px 28px;
  }
}
</style>
