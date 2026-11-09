<template>
  <section id="planos" class="scroll-mt-16 bg-cream-alt py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p v-reveal class="text-sm font-extrabold uppercase tracking-[0.22em] text-primary-500">Planos</p>
        <h2 v-reveal="{ delay: 80 }" class="mt-3 font-elegant text-4xl leading-tight sm:text-5xl">
          Escolha o <em class="text-primary-500">tempo de totem</em> do seu evento
        </h2>
        <p v-reveal="{ delay: 160 }" class="mt-4 text-lg text-ink-muted">
          Quanto mais horas, mais jogos de presente: a cada hora a mais, <strong class="text-ink">1 jogo extra grátis</strong>.
        </p>
      </div>

      <div class="mx-auto mt-16 grid max-w-5xl items-stretch gap-6 md:grid-cols-3 md:gap-5">
        <article
          v-for="(plan, i) in plans"
          :key="plan.hours"
          v-reveal="{ delay: i * 110 }"
          class="relative flex flex-col rounded-[2rem] p-8 transition-transform duration-300"
          :class="plan.popular
            ? 'bg-primary-900 text-white shadow-2xl shadow-primary-500/25 ring-1 ring-primary-400/40 md:-my-5 md:scale-[1.04] md:py-12'
            : 'border border-ink/[0.08] bg-white shadow-sm shadow-ink/[0.04] hover:-translate-y-1.5'"
        >
          <span
            v-if="plan.popular"
            class="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r
              from-amber-300 to-amber-400 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-900 shadow-lg"
          >
            <Star :size="13" class="fill-current" /> Mais popular
          </span>

          <p class="text-sm font-bold uppercase tracking-[0.2em]" :class="plan.popular ? 'text-primary-300' : 'text-primary-500'">
            {{ plan.tagline }}
          </p>

          <p class="mt-4 flex items-baseline gap-2">
            <span class="font-elegant text-7xl font-bold leading-none">{{ plan.hours }}</span>
            <span class="text-xl font-bold" :class="plan.popular ? 'text-white/70' : 'text-ink-muted'">horas</span>
          </p>
          <p class="mt-1 text-sm" :class="plan.popular ? 'text-white/55' : 'text-ink-soft'">de totem no seu evento</p>

          <div
            class="mt-6 flex items-center gap-3 rounded-2xl px-4 py-3"
            :class="plan.popular ? 'bg-white/10' : 'bg-primary-50'"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              :class="plan.popular ? 'bg-amber-300 text-primary-900' : 'bg-primary text-white'"
            >
              <Gift :size="20" />
            </span>
            <span class="font-heading text-lg font-bold leading-tight">
              {{ plan.freeGames }} {{ plan.freeGames === 1 ? 'jogo grátis' : 'jogos grátis' }}
              <small class="block text-xs font-medium" :class="plan.popular ? 'text-white/60' : 'text-ink-muted'">
                além dos jogos contratados
              </small>
            </span>
          </div>

          <ul class="mt-7 flex-1 space-y-3 text-sm">
            <li v-for="item in planIncludes" :key="item" class="flex items-start gap-3">
              <Check :size="18" class="mt-0.5 shrink-0" :class="plan.popular ? 'text-primary-300' : 'text-primary'" />
              <span :class="plan.popular ? 'text-white/85' : 'text-ink-muted'">{{ item }}</span>
            </li>
          </ul>

          <button
            type="button"
            class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-extrabold
              transition-transform hover:scale-[1.02] active:scale-95"
            :class="plan.popular
              ? 'bg-white text-primary-800 shadow-lg shadow-black/20'
              : 'bg-primary-900 text-white hover:bg-primary-800'"
            @click="choose(plan.hours)"
          >
            Quero {{ plan.hours }} horas <ArrowRight :size="18" />
          </button>
        </article>
      </div>

      <p v-reveal class="mx-auto mt-14 max-w-xl text-center text-sm text-ink-muted">
        Os valores dependem dos jogos escolhidos e do local do evento. Peça um orçamento e a gente responde pelo
        WhatsApp.
      </p>
    </div>
  </section>
</template>

<script setup>
import { Check, Gift, Star, ArrowRight } from '@lucide/vue'
import { vReveal } from '@/directives/reveal'
import { plans, planIncludes } from './content'
import { quoteState } from './quoteState'

function choose(hours) {
  quoteState.hours = hours
  document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
