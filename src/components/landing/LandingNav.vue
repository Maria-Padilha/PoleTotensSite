<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-primary-900/85 shadow-lg shadow-black/20 backdrop-blur-xl' : 'bg-transparent'"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
      <a href="#inicio" class="flex items-center gap-2.5" @click.prevent="goTo('inicio')">
        <img src="@/assets/logo.png" alt="" class="h-9 w-9 object-contain" />
        <span class="flex flex-col leading-none">
          <strong class="font-heading text-lg font-bold tracking-wide text-white">Pole Totens</strong>
          <small class="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">by Pole Eventos</small>
        </span>
      </a>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Seções da página">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-full px-4 py-2 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          @click.prevent="goTo(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <a
          href="#orcamento"
          class="hidden rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-primary-800 shadow-lg shadow-black/20
            transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
          @click.prevent="goTo('orcamento')"
        >
          Pedir orçamento
        </a>
        <button
          type="button"
          class="rounded-full p-2.5 text-white hover:bg-white/10 lg:hidden"
          :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="open"
          @click="open = !open"
        >
          <component :is="open ? X : Menu" :size="22" />
        </button>
      </div>
    </div>

    <Transition name="lp-menu">
      <nav v-if="open" class="border-t border-white/10 bg-primary-900/95 px-5 pb-5 pt-2 backdrop-blur-xl lg:hidden" aria-label="Menu">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="block rounded-xl px-3 py-3 text-base font-semibold text-white/85 hover:bg-white/10"
          @click.prevent="goTo(link.id)"
        >
          {{ link.label }}
        </a>
        <a
          href="#orcamento"
          class="mt-3 block rounded-full bg-white px-5 py-3 text-center text-base font-extrabold text-primary-800"
          @click.prevent="goTo('orcamento')"
        >
          Pedir orçamento
        </a>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from '@lucide/vue'

const links = [
  { id: 'jogos', label: 'Jogos' },
  { id: 'experimente', label: 'Experimente' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'planos', label: 'Planos' },
  { id: 'galeria', label: 'Fotos e vídeos' },
]

const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function goTo(id) {
  open.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.lp-menu-enter-active,
.lp-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.lp-menu-enter-from,
.lp-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
