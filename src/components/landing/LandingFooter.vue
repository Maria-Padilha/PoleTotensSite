<template>
  <footer class="bg-primary-900 py-12 text-white/60">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row">
      <div class="flex items-center gap-3">
        <img src="@/assets/logo.png" alt="" class="h-9 w-9 object-contain" />
        <div class="leading-tight">
          <strong class="font-heading text-lg tracking-wide text-white">Pole Totens</strong>
          <p class="text-xs">Totens interativos para eventos · by Pole Eventos</p>
        </div>
      </div>

      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold" aria-label="Rodapé">
        <a v-for="link in links" :key="link.id" :href="`#${link.id}`" class="hover:text-white" @click.prevent="goTo(link.id)">
          {{ link.label }}
        </a>
      </nav>

      <div class="text-center text-xs md:text-right">
        <a :href="whatsapp" target="_blank" rel="noopener" class="font-bold text-white hover:underline">WhatsApp {{ WHATSAPP_LABEL }}</a>
        <p class="mt-1">© {{ year }} Pole Eventos. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { whatsappLink, WHATSAPP_LABEL } from './content'

const year = new Date().getFullYear()
const whatsapp = whatsappLink()

const links = [
  { id: 'jogos', label: 'Jogos' },
  { id: 'experimente', label: 'Experimente' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'planos', label: 'Planos' },
  { id: 'galeria', label: 'Fotos e vídeos' },
  { id: 'orcamento', label: 'Orçamento' },
]

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
