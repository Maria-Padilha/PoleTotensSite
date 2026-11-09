<template>
  <section id="inicio" class="lp-hero-bg relative isolate overflow-hidden text-white">
    <div class="lp-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

    <div class="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32 lg:pt-40">
      <div>
        <p
          v-reveal
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5
            text-xs font-bold uppercase tracking-[0.2em] text-primary-200 backdrop-blur"
        >
          <Sparkles :size="14" /> Totens interativos para eventos
        </p>

        <h1
          v-reveal="{ delay: 80 }"
          class="mt-6 font-elegant text-5xl font-bold leading-[1.04] tracking-tight !text-white sm:text-6xl lg:text-7xl"
        >
          Transforme convidados em <span class="lp-gradient-text italic">jogadores</span>.
        </h1>

        <p v-reveal="{ delay: 160 }" class="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
          Quiz, roleta, karaokê, caça-palavras e mais, em totens com a sua marca, ranking ao vivo e captação de
          leads. O evento fica mais animado e você sai com dados na mão.
        </p>

        <div v-reveal="{ delay: 240 }" class="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#orcamento"
            class="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-extrabold
              text-primary-800 shadow-xl shadow-black/25 transition-transform hover:scale-[1.03] active:scale-95"
            @click.prevent="scrollTo('orcamento')"
          >
            Pedir orçamento
            <ArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#experimente"
            class="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-bold
              text-white transition-colors hover:bg-white/10"
            @click.prevent="scrollTo('experimente')"
          >
            <Play :size="18" /> Jogar uma demo
          </a>
        </div>

        <ul v-reveal="{ delay: 320 }" class="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-white/65">
          <li v-for="chip in quickChips" :key="chip.label" class="inline-flex items-center gap-2">
            <component :is="chip.icon" :size="16" class="text-primary-300" /> {{ chip.label }}
          </li>
        </ul>
      </div>

      <!-- composição ilustrativa: cartões flutuando em volta de um totem -->
      <div v-reveal="{ delay: 200 }" class="relative mx-auto h-[460px] w-full max-w-md sm:h-[520px]" aria-hidden="true">
        <div
          class="absolute left-1/2 top-1/2 h-[88%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem]
            border border-primary-300/40 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-800 p-2.5
            shadow-[0_30px_80px_-10px_rgba(16,147,155,0.55)]"
        >
          <div class="flex h-full flex-col items-center justify-center gap-3 rounded-[1.3rem] bg-primary-900 text-center">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-400 text-white">
              <Gamepad2 :size="24" />
            </span>
            <span class="font-elegant text-lg font-bold leading-tight">Escolha<br />um jogo</span>
            <span class="h-1.5 w-10 rounded-full bg-primary-300/60" />
          </div>
        </div>

        <div class="lp-float absolute left-0 top-6 w-52 rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-xl backdrop-blur-xl" style="--r: -4deg">
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-200">
            <Trophy :size="14" /> Ranking
          </p>
          <ul class="mt-3 space-y-2 text-sm">
            <li class="flex items-center justify-between"><span>1º Ana</span><strong class="text-amber-300">980</strong></li>
            <li class="flex items-center justify-between"><span>2º Bruno</span><strong>870</strong></li>
            <li class="flex items-center justify-between"><span>3º Carla</span><strong>760</strong></li>
          </ul>
        </div>

        <div class="lp-float absolute bottom-10 right-0 w-56 rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-xl backdrop-blur-xl" style="--r: 3deg; animation-delay: -2s">
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-200">
            <Users :size="14" /> Novo lead
          </p>
          <p class="mt-2 text-sm font-bold">Maria Souza</p>
          <p class="text-xs text-white/60">(11) 9•••• ••••</p>
        </div>

        <div class="lp-float absolute right-4 top-2 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.1] px-4 py-2 text-sm font-bold shadow-xl backdrop-blur-xl" style="--r: 5deg; animation-delay: -4s">
          <Timer :size="16" class="text-amber-300" /> 0:30
        </div>

        <div class="lp-float absolute bottom-0 left-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.1] px-4 py-2 text-sm font-bold shadow-xl backdrop-blur-xl" style="--r: -3deg; animation-delay: -1s">
          <Mic :size="16" class="text-primary-300" /> Karaokê
        </div>
      </div>
    </div>

    <!-- faixa rolando com os jogos -->
    <div class="relative border-y border-white/10 bg-black/20 py-4 backdrop-blur" aria-hidden="true">
      <div class="flex w-max lp-marquee gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em] text-white/55">
        <template v-for="n in 2" :key="n">
          <span v-for="game in games" :key="`${n}-${game.slug}`" class="inline-flex items-center gap-3">
            <component :is="game.icon" :size="16" class="text-primary-300" /> {{ game.name }}
            <span class="text-white/20">✦</span>
          </span>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Play, Sparkles, Trophy, Users, Timer, Mic, Gamepad2 } from '@lucide/vue'
import { vReveal } from '@/directives/reveal'
import { games, quickChips } from './content'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
