<template>
  <section id="jogos" class="relative scroll-mt-16 bg-cream py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <!-- pilares -->
      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          v-reveal="{ delay: i * 100 }"
          class="rounded-3xl border border-ink/[0.07] bg-white p-8 shadow-sm shadow-ink/[0.03]"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <component :is="pillar.icon" :size="24" />
          </span>
          <h3 class="mt-5 text-xl">{{ pillar.title }}</h3>
          <p class="mt-2 leading-relaxed text-ink-muted">{{ pillar.text }}</p>
        </article>
      </div>

      <!-- jogos -->
      <div class="mt-24 max-w-2xl">
        <p v-reveal class="text-sm font-extrabold uppercase tracking-[0.22em] text-primary-500">Os jogos</p>
        <h2 v-reveal="{ delay: 80 }" class="mt-3 font-elegant text-4xl leading-tight sm:text-5xl">
          Sete jogos para <em class="text-primary-500">cada tipo de evento</em>
        </h2>
        <p v-reveal="{ delay: 160 }" class="mt-4 text-lg text-ink-muted">
          Escolha um ou combine vários no mesmo totem. Cada um é montado com o conteúdo e a identidade visual do seu
          evento.
        </p>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(game, i) in games"
          :key="game.slug"
          v-reveal="{ delay: (i % 3) * 90 }"
          class="group relative overflow-hidden rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-sm shadow-ink/[0.03]
            transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10"
        >
          <span
            class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-50 transition-transform duration-500 group-hover:scale-150"
          />
          <span
            class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900 text-primary-200
              transition-colors group-hover:bg-primary"
          >
            <component :is="game.icon" :size="26" class="group-hover:text-white" />
          </span>
          <h3 class="relative mt-5 text-xl">{{ game.name }}</h3>
          <p class="relative mt-0.5 text-sm font-bold text-primary-500">{{ game.tagline }}</p>
          <p class="relative mt-3 leading-relaxed text-ink-muted">{{ game.text }}</p>
        </article>

        <article
          v-reveal
          class="flex flex-col justify-between rounded-3xl bg-primary-900 p-7 text-white sm:col-span-2 lg:col-span-1"
        >
          <div>
            <Sparkles :size="28" class="text-amber-300" />
            <h3 class="mt-4 text-xl !text-white">Tem outra ideia?</h3>
            <p class="mt-2 leading-relaxed text-white/65">
              Conte o que você imagina para o seu evento. A gente avalia como colocar no totem.
            </p>
          </div>
          <a
            href="#orcamento"
            class="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-primary-800"
            @click.prevent="scrollToQuote"
          >
            Falar com a gente <ArrowRight :size="16" />
          </a>
        </article>
      </div>

      <!-- recursos -->
      <div class="mt-24 rounded-[2rem] bg-primary-900 p-8 sm:p-12">
        <h2 v-reveal class="max-w-xl font-elegant text-3xl !text-white sm:text-4xl">
          Mais que jogos: <em class="lp-gradient-text">resultado para a sua marca</em>
        </h2>
        <div class="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(feature, i) in features" :key="feature.title" v-reveal="{ delay: (i % 3) * 80 }" class="flex gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-300">
              <component :is="feature.icon" :size="20" />
            </span>
            <div>
              <h3 class="text-base !text-white">{{ feature.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-white/60">{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Sparkles } from '@lucide/vue'
import { vReveal } from '@/directives/reveal'
import { games, pillars, features } from './content'

function scrollToQuote() {
  document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
