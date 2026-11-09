<template>
  <section id="galeria" class="scroll-mt-16 bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <p v-reveal class="text-sm font-extrabold uppercase tracking-[0.22em] text-primary-500">Na prática</p>
          <h2 v-reveal="{ delay: 80 }" class="mt-3 font-elegant text-4xl leading-tight sm:text-5xl">
            Veja os totens <em class="text-primary-500">em ação</em>
          </h2>
        </div>

        <div v-reveal="{ delay: 120 }" class="inline-flex rounded-full border border-ink/10 bg-white p-1" role="tablist">
          <button
            v-for="option in filters"
            :key="option.value"
            type="button"
            role="tab"
            :aria-selected="filter === option.value"
            class="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors"
            :class="filter === option.value ? 'bg-primary-900 text-white' : 'text-ink-muted hover:text-ink'"
            @click="filter = option.value"
          >
            <component :is="option.icon" :size="15" /> {{ option.label }}
          </button>
        </div>
      </div>

      <div class="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-3">
        <button
          v-for="(item, i) in visible"
          :key="item.title"
          v-reveal="{ delay: (i % 3) * 80 }"
          type="button"
          class="group relative overflow-hidden rounded-3xl text-left shadow-sm shadow-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :class="spanClass(i)"
          :aria-label="`${item.type === 'video' ? 'Assistir' : 'Ver'}: ${item.title}`"
          @click="open(item)"
        >
          <!-- mídia real, quando o arquivo existe -->
          <template v-if="item.src && !failed.has(item.src)">
            <img
              v-if="item.type === 'photo'"
              :src="item.src"
              :alt="item.title"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              @error="failed.add(item.src)"
            />
            <template v-else>
              <img
                v-if="item.poster"
                :src="item.poster"
                :alt="item.title"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <video
                v-else
                :src="item.src"
                muted
                playsinline
                preload="metadata"
                class="h-full w-full object-cover"
                @error="failed.add(item.src)"
              />
            </template>
          </template>

          <!-- espaço reservado enquanto não há foto/vídeo -->
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-800 to-primary-900 text-primary-200"
          >
            <component :is="item.type === 'video' ? Film : Camera" :size="34" class="opacity-60" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              {{ item.type === 'video' ? 'Vídeo em breve' : 'Foto em breve' }}
            </span>
          </div>

          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <span
            v-if="item.type === 'video' && hasMedia(item)"
            class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center
              rounded-full bg-white/90 text-primary-800 shadow-xl transition-transform group-hover:scale-110"
          >
            <Play :size="26" class="translate-x-0.5" />
          </span>
          <div class="absolute inset-x-0 bottom-0 p-5">
            <p class="font-heading text-lg font-bold text-white">{{ item.title }}</p>
            <p class="text-sm text-white/70">{{ item.caption }}</p>
          </div>
        </button>
      </div>
    </div>

    <p class="mx-auto mt-8 max-w-7xl px-5 text-xs text-ink-soft sm:px-8">
      Fotos e vídeos ilustrativos do banco gratuito
      <a href="https://www.pexels.com" target="_blank" rel="noopener" class="underline hover:text-ink">Pexels</a>,
      usados enquanto não publicamos o material dos nossos eventos.
    </p>

    <!-- visualizador -->
    <Teleport to="body">
      <Transition name="lp-lightbox">
        <div
          v-if="active"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          :aria-label="active.title"
          @click.self="close"
        >
          <button
            type="button"
            class="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Fechar"
            @click="close"
          >
            <X :size="24" />
          </button>

          <div class="max-h-full w-full max-w-5xl">
            <video
              v-if="active.type === 'video' && active.src && !failed.has(active.src)"
              :src="active.src"
              :poster="active.poster || undefined"
              controls
              autoplay
              playsinline
              class="max-h-[80vh] w-full rounded-2xl bg-black"
              @error="failed.add(active.src)"
            />
            <img
              v-else-if="active.type === 'photo' && active.src && !failed.has(active.src)"
              :src="active.src"
              :alt="active.title"
              class="mx-auto max-h-[80vh] rounded-2xl object-contain"
            />
            <div v-else class="rounded-2xl bg-primary-900 p-12 text-center text-white">
              <component :is="active.type === 'video' ? Film : Camera" :size="40" class="mx-auto text-primary-300" />
              <p class="mt-4 font-heading text-xl font-bold">{{ active.title }}</p>
              <p class="mt-1 text-white/60">Este conteúdo será publicado em breve.</p>
            </div>
            <p class="mt-4 text-center text-white/75">{{ active.title }} — {{ active.caption }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onUnmounted } from 'vue'
import { Camera, Film, Play, X, Sparkles } from '@lucide/vue'
import { vReveal } from '@/directives/reveal'
import { media } from './content'

const filters = [
  { value: 'all', label: 'Tudo', icon: Sparkles },
  { value: 'photo', label: 'Fotos', icon: Camera },
  { value: 'video', label: 'Vídeos', icon: Film },
]

const filter = ref('all')
const active = ref(null)
// arquivos que falharam ao carregar (caminho errado, arquivo ainda não enviado…)
const failed = reactive(new Set())

const visible = computed(() => (filter.value === 'all' ? media : media.filter((m) => m.type === filter.value)))

const hasMedia = (item) => Boolean(item.src) && !failed.has(item.src)

// Primeiro item largo (no "Tudo") e o último preenche o que sobrar da linha,
// pra a grade nunca terminar com um cartão sozinho de lado.
function spanClass(index) {
  const items = visible.value
  const firstWide = filter.value === 'all'
  const spanOf = (i) => (i === 0 && firstWide ? 2 : 1)

  if (index === items.length - 1 && items.length > 1) {
    let used = 0
    for (let i = 0; i < index; i++) used += spanOf(i)
    const free = used % 3 === 0 ? 3 : 3 - (used % 3)
    return `sm:col-span-2 ${free === 3 ? 'lg:col-span-3' : free === 2 ? 'lg:col-span-2' : ''}`
  }
  return spanOf(index) === 2 ? 'sm:col-span-2' : ''
}

function open(item) {
  active.value = item
}

function close() {
  active.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(active, (item) => {
  document.body.style.overflow = item ? 'hidden' : ''
  if (item) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.lp-lightbox-enter-active,
.lp-lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lp-lightbox-enter-from,
.lp-lightbox-leave-to {
  opacity: 0;
}
</style>
