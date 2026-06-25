<script setup>
defineProps({
  homeHref: {
    type: String,
    default: '#',
  },
  iconSrc: {
    type: String,
    default: '/favicon.png',
  },
  links: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <header class="site-header">
    <nav class="nav">
      <a class="brand" :href="homeHref">
        <img :src="iconSrc" alt="" aria-hidden="true">
        <span>Flow<span>Smith</span></span>
      </a>
      <div class="nav-links">
        <a v-for="link in links" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(63, 77, 43, .08);
  background: rgba(249, 240, 142, 0.7);
  backdrop-filter: blur(12px);
}

.nav {
  width: min(980px, 100%);
  min-height: 50px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--green);
  text-decoration: none;
  font-family: "Baloo 2", Inter, sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: .01em;
}

.brand img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.brand span span {
  color: var(--gold-deep);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a {
  color: var(--green);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.nav-links a:hover {
  color: var(--gold-deep);
}

@media (max-width: 680px) {
  .nav {
    min-height: auto;
    padding: 10px 14px;
  }

  .brand {
    font-size: 18px;
    gap: 7px;
  }

  .brand img {
    width: 28px;
    height: 28px;
  }

  .nav-links {
    gap: 12px;
  }

  .nav-links a {
    font-size: 12px;
  }
}
</style>
