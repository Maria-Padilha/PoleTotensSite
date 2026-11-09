<template>
  <span>
    <template v-for="(part, i) in parts" :key="i">
      <span
        v-if="part.highlight"
        class="font-extrabold"
        :class="variant === 'underline' ? 'underline decoration-2 underline-offset-4' : ''"
        :style="variant === 'underline' ? undefined : { color }"
      >{{ part.text }}</span>
      <template v-else>{{ part.text }}</template>
    </template>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, default: '' },
  color: { type: String, default: '#10939b' },
  // 'color': troca a cor pro accent (padrão, usado em textos sobre o fundo da página).
  // 'underline': mantém a cor do texto e só sublinha — usado em cima de superfícies já
  // coloridas com o próprio accent (ex: o botão "Toque para começar"), onde trocar a cor
  // do texto pela mesma cor do fundo deixaria a palavra invisível.
  variant: { type: String, default: 'color' },
})

// Sintaxe simples: **palavra** vira destacada na cor de acento. Sem v-html —
// só divide a string e alterna span estilizado / texto puro.
const parts = computed(() => {
  if (!props.text) return []
  return props.text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      if (chunk.startsWith('**') && chunk.endsWith('**')) {
        return { text: chunk.slice(2, -2), highlight: true }
      }
      return { text: chunk, highlight: false }
    })
})
</script>
