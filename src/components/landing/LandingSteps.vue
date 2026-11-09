<template>
  <section id="como-funciona" class="scroll-mt-16 bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="max-w-2xl">
        <p v-reveal class="text-sm font-extrabold uppercase tracking-[0.22em] text-primary-500">Como funciona</p>
        <h2 v-reveal="{ delay: 80 }" class="mt-3 font-elegant text-4xl leading-tight sm:text-5xl">
          Do pedido ao <em class="text-primary-500">resultado</em>, em quatro passos
        </h2>
      </div>

      <ol class="relative mt-14 grid gap-6 lg:grid-cols-4">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          v-reveal="{ delay: i * 110 }"
          class="relative rounded-3xl border border-ink/[0.07] bg-cream p-7"
        >
          <span class="font-elegant text-6xl font-bold leading-none text-primary-200">{{ i + 1 }}</span>
          <h3 class="mt-4 text-lg">{{ step.title }}</h3>
          <p class="mt-2 leading-relaxed text-ink-muted">{{ step.text }}</p>
          <span
            v-if="i < steps.length - 1"
            class="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full
              bg-primary text-white shadow-lg lg:flex"
            aria-hidden="true"
          >
            <ArrowRight :size="16" />
          </span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from '@lucide/vue'
import { vReveal } from '@/directives/reveal'
import { steps } from './content'
</script>
