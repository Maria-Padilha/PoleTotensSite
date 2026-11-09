<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener"
    class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3.5 text-sm
      font-extrabold text-white shadow-xl shadow-black/30 transition-transform hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
    aria-label="Falar com a gente no WhatsApp"
  >
    <svg viewBox="0 0 32 32" class="h-6 w-6 fill-current" aria-hidden="true">
      <path
        d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 29l8.14-1.56a12.03 12.03 0 0 0 3.9.65h.01C22.68 28.09 28 22.7 28 16.05 28 9.4 22.68 3 16.04 3Zm0 22.1c-1.2 0-2.38-.32-3.4-.93l-.25-.15-4.83.93.96-4.7-.16-.26a9.97 9.97 0 0 1-1.54-5.3c0-5.5 4.5-9.97 10.03-9.97 5.52 0 10 4.47 10 9.98 0 5.5-4.48 10.4-10.8 10.4Zm5.5-7.47c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.52-.08-.15-.68-1.64-.93-2.25-.24-.58-.5-.5-.68-.5l-.58-.01c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"
      />
    </svg>
    <span class="hidden sm:inline">WhatsApp</span>
  </a>
</template>

<script setup>
import { whatsappLink } from './content'

const link = whatsappLink('Olá! Vim pelo site do Pole Totens e gostaria de saber mais.')
</script>
