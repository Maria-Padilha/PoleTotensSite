<template>
  <section id="experimente" class="relative scroll-mt-16 overflow-hidden bg-primary-900 py-24 text-white sm:py-32">
    <div class="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"
      style="background: radial-gradient(50% 40% at 80% 40%, rgba(52,197,205,0.25), transparent 70%), radial-gradient(40% 40% at 5% 90%, rgba(255,180,84,0.12), transparent 70%)" />

    <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_420px] lg:gap-20">
      <div class="max-w-xl">
        <p v-reveal class="text-sm font-extrabold uppercase tracking-[0.22em] text-primary-300">Experimente agora</p>
        <h2 v-reveal="{ delay: 80 }" class="mt-3 font-elegant text-4xl leading-tight !text-white sm:text-5xl">
          Jogue do jeito que o <em class="lp-gradient-text">convidado vai jogar</em>
        </h2>
        <p v-reveal="{ delay: 160 }" class="mt-5 text-lg leading-relaxed text-white/70">
          Este é um jogo de verdade, rodando numa tela de totem: um caça-palavras com 3 palavras escondidas e 30
          segundos no cronômetro. Toque em começar e encontre todas antes do tempo acabar.
        </p>

        <ul v-reveal="{ delay: 240 }" class="mt-8 space-y-3 text-white/80">
          <li class="flex items-center gap-3"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primary-300"><MousePointerClick :size="16" /></span> Arraste o dedo (ou o mouse) sobre as letras</li>
          <li class="flex items-center gap-3"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primary-300"><Timer :size="16" /></span> 30 segundos; cada erro custa alguns segundos</li>
          <li class="flex items-center gap-3"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primary-300"><Trophy :size="16" /></span> No evento de verdade, a pontuação entra no ranking</li>
        </ul>

        <Transition name="lp-fade">
          <div v-if="played" class="mt-9 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur">
            <p class="font-bold text-white">Gostou? Imagine isso com a sua marca.</p>
            <a
              href="#orcamento"
              class="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-primary-800"
              @click.prevent="scrollToQuote"
            >
              Pedir orçamento <ArrowRight :size="16" />
            </a>
          </div>
        </Transition>
      </div>

      <!-- o totem com o jogo de verdade, em escala reduzida -->
      <div v-reveal="{ delay: 120 }" class="mx-auto w-full max-w-[360px] lg:max-w-none">
        <div class="lp-totem">
          <div ref="screen" class="lp-totem-screen" :style="{ height: `${STAGE_H * scale}px` }">
            <div class="lp-stage" :style="{ transform: `scale(${scale})` }">
              <CacaPalavrasPlayer
                v-if="scale > 0"
                title="Caça-Palavras"
                :config="demoConfig"
                :top-inset="0"
                @finished="played = true"
              />
            </div>
          </div>
        </div>
        <p class="mt-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-white/40">
          Demonstração interativa
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRight, MousePointerClick, Timer, Trophy } from '@lucide/vue'
import CacaPalavrasPlayer from '@/games/caca-palavras/CacaPalavrasPlayer.vue'
import { vReveal } from '@/directives/reveal'

// Tamanho real de uma tela de totem em pé; o jogo roda nele e é reduzido
// pra caber na moldura (o jogo é desenhado pra totem, não pra celular).
const STAGE_W = 1080
const STAGE_H = 1920

const demoConfig = {
  theme: 'claro',
  primary_color: '#10939b',
  headline: 'Ache as 3 palavras',
  subtitle: 'antes que o tempo acabe',
  start_button_text: 'Começar',
  timer_seconds: 30,
  points_per_question: 10,
  win_threshold: 60,
  sound_enabled: false,
  words: [
    { id: 'w1', word: 'TOTEM' },
    { id: 'w2', word: 'JOGAR' },
    { id: 'w3', word: 'FESTA' },
  ],
}

const screen = ref(null)
const scale = ref(0)
const played = ref(false)
let observer = null

let frameId = null

// Adiado pro próximo quadro: mudar a escala muda a altura da tela, e fazer isso
// dentro do próprio callback do ResizeObserver gera o aviso de "loop".
function updateScale() {
  cancelAnimationFrame(frameId)
  frameId = requestAnimationFrame(() => {
    if (screen.value) scale.value = screen.value.clientWidth / STAGE_W
  })
}

function scrollToQuote() {
  document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  updateScale()
  observer = new ResizeObserver(updateScale)
  observer.observe(screen.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frameId)
})
</script>

<style scoped>
.lp-fade-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.lp-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
