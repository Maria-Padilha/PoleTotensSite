<template>
  <section id="orcamento" class="lp-hero-bg relative isolate scroll-mt-16 overflow-hidden py-24 text-white sm:py-32">
    <div class="lp-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

    <div class="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div class="max-w-md">
        <p v-reveal class="text-sm font-extrabold uppercase tracking-[0.22em] text-primary-300">Orçamento</p>
        <h2 v-reveal="{ delay: 80 }" class="mt-3 font-elegant text-4xl leading-tight !text-white sm:text-5xl">
          Vamos montar o totem do <em class="lp-gradient-text">seu evento</em>
        </h2>
        <p v-reveal="{ delay: 160 }" class="mt-5 text-lg leading-relaxed text-white/70">
          Conte um pouco sobre o evento e os jogos que você tem em mente. Ao enviar, abrimos uma conversa no WhatsApp
          com todas as informações para a gente te responder com uma proposta sob medida.
        </p>

        <ul v-reveal="{ delay: 240 }" class="mt-8 space-y-4 text-white/80">
          <li class="flex items-start gap-3">
            <Check :size="20" class="mt-0.5 shrink-0 text-primary-300" /> Sem compromisso: o orçamento é gratuito
          </li>
          <li class="flex items-start gap-3">
            <Check :size="20" class="mt-0.5 shrink-0 text-primary-300" /> Jogos personalizados com a sua marca
          </li>
          <li class="flex items-start gap-3">
            <Check :size="20" class="mt-0.5 shrink-0 text-primary-300" /> Lista de leads e recap do evento inclusos
          </li>
        </ul>

        <a
          v-reveal="{ delay: 300 }"
          :href="directLink"
          target="_blank"
          rel="noopener"
          class="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-3.5 backdrop-blur
            transition-colors hover:bg-white/[0.12]"
        >
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white"><MessageCircle :size="20" /></span>
          <span class="leading-tight">
            <small class="block text-xs text-white/55">Prefere falar direto? WhatsApp</small>
            <strong class="text-lg">{{ WHATSAPP_LABEL }}</strong>
          </span>
        </a>
      </div>

      <div v-reveal="{ delay: 120 }" class="rounded-[2rem] border border-white/12 bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-9">
        <!-- enviado -->
        <div v-if="sent" class="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
          <span class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary">
            <Check :size="38" />
          </span>
          <h3 class="mt-6 font-elegant text-3xl">Quase lá!</h3>
          <p class="mt-3 max-w-sm text-ink-muted">
            Abrimos o WhatsApp com as informações do seu evento. É só tocar em <strong>enviar</strong> na conversa para
            a gente receber. Se não abriu, use o botão abaixo.
          </p>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
            class="btn-primary mt-7 !bg-[#25d366] !py-3.5 !text-base hover:!bg-[#1fb957]"
          >
            <MessageCircle :size="20" /> Abrir WhatsApp
          </a>
          <button type="button" class="btn-outline mt-4" @click="reset">Fazer outro pedido</button>
        </div>

        <form v-else class="space-y-5" novalidate @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="field">
              <label for="q-name">Seu nome *</label>
              <input id="q-name" v-model.trim="form.name" type="text" autocomplete="name" maxlength="150" required />
              <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
            </div>
            <div class="field">
              <label for="q-company">Empresa</label>
              <input id="q-company" v-model.trim="form.company" type="text" autocomplete="organization" maxlength="150" />
            </div>
            <div class="field">
              <label for="q-email">E-mail *</label>
              <input id="q-email" v-model.trim="form.email" type="email" autocomplete="email" maxlength="255" required />
              <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
            </div>
            <div class="field">
              <label for="q-phone">Telefone / WhatsApp *</label>
              <input
                id="q-phone"
                :value="form.phone"
                type="tel"
                inputmode="tel"
                autocomplete="tel"
                placeholder="(11) 90000-0000"
                maxlength="16"
                required
                @input="form.phone = maskPhone($event.target.value)"
              />
              <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
            </div>
            <div class="field">
              <label for="q-type">Tipo de evento</label>
              <select id="q-type" v-model="form.event_type">
                <option value="">Selecione</option>
                <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="field">
                <label for="q-date">Data</label>
                <input id="q-date" v-model="form.event_date" type="date" :min="today" />
                <p v-if="errors.event_date" class="field-error">{{ errors.event_date }}</p>
              </div>
              <div class="field">
                <label for="q-guests">Convidados</label>
                <input id="q-guests" v-model.number="form.guests" type="number" min="1" inputmode="numeric" placeholder="150" />
              </div>
            </div>
          </div>

          <fieldset>
            <legend class="mb-2 text-sm font-bold text-ink">Duração do totem</legend>
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <label
                v-for="plan in plans"
                :key="plan.hours"
                class="relative cursor-pointer select-none rounded-xl border px-3 py-2.5 text-center transition-colors"
                :class="quoteState.hours === plan.hours
                  ? 'border-primary bg-primary-50 text-primary-700'
                  : 'border-ink/10 text-ink-muted hover:border-primary'"
              >
                <input v-model="quoteState.hours" type="radio" name="q-hours" :value="plan.hours" class="sr-only" />
                <span class="block font-heading text-lg font-bold leading-none">{{ plan.hours }}h</span>
                <span class="mt-1 block text-[11px] font-bold">{{ plan.freeGames }} {{ plan.freeGames === 1 ? 'jogo grátis' : 'jogos grátis' }}</span>
                <span
                  v-if="plan.popular"
                  class="absolute -top-2 right-2 rounded-full bg-amber-300 px-2 py-0.5 text-[9px] font-extrabold uppercase text-primary-900"
                >Popular</span>
              </label>
              <label
                class="cursor-pointer select-none rounded-xl border px-3 py-2.5 text-center transition-colors"
                :class="quoteState.hours === null
                  ? 'border-primary bg-primary-50 text-primary-700'
                  : 'border-ink/10 text-ink-muted hover:border-primary'"
              >
                <input v-model="quoteState.hours" type="radio" name="q-hours" :value="null" class="sr-only" />
                <span class="block font-heading text-lg font-bold leading-none">?</span>
                <span class="mt-1 block text-[11px] font-bold">Ainda não sei</span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend class="mb-2 text-sm font-bold text-ink">Jogos de interesse</legend>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="game in games"
                :key="game.slug"
                class="cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-bold transition-colors"
                :class="form.games.includes(game.name)
                  ? 'border-primary bg-primary text-white'
                  : 'border-ink/10 text-ink-muted hover:border-primary hover:text-primary'"
              >
                <input v-model="form.games" type="checkbox" :value="game.name" class="sr-only" />
                {{ game.name }}
              </label>
            </div>
          </fieldset>

          <div class="field">
            <label for="q-message">Conte mais sobre o evento</label>
            <textarea
              id="q-message"
              v-model="form.message"
              rows="4"
              maxlength="2000"
              placeholder="Objetivo, público, local, o que você imagina para os totens..."
            />
          </div>

          <!-- isca pra robôs: escondida de pessoas -->
          <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Não preencha <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" /></label>
          </div>

          <p v-if="errorMessage" class="rounded-xl bg-danger-tint px-4 py-3 text-sm font-semibold text-danger" role="alert">
            {{ errorMessage }}
          </p>

          <button type="submit" class="btn-primary w-full !py-4 !text-base" :disabled="sending">
            <template v-if="sending">Enviando...</template>
            <template v-else><MessageCircle :size="18" /> Enviar pelo WhatsApp</template>
          </button>
          <p class="text-center text-xs text-ink-soft">
            Vamos registrar o pedido e abrir o WhatsApp {{ WHATSAPP_LABEL }} com a mensagem pronta.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { Check, MessageCircle } from '@lucide/vue'
import api from '@/services/api'
import { vReveal } from '@/directives/reveal'
import { games, eventTypes, plans, planLabel, whatsappLink, WHATSAPP_LABEL } from './content'
import { quoteState } from './quoteState'

const today = new Date().toISOString().slice(0, 10)

function emptyForm() {
  return {
    name: '',
    company: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    guests: null,
    games: [],
    message: '',
    website: '',
  }
}

const form = reactive(emptyForm())
const errors = reactive({})
const errorMessage = ref('')
const sending = ref(false)
const sent = ref(false)

const directLink = whatsappLink('Olá! Vim pelo site do Pole Totens e gostaria de um orçamento.')

// Mensagem pronta com tudo que a pessoa preencheu (só os campos informados).
function buildMessage() {
  const lines = ['Olá! Gostaria de um orçamento de totens interativos para o meu evento.', '']
  const add = (label, value) => value && lines.push(`${label}: ${value}`)

  add('Nome', form.name)
  add('Empresa', form.company)
  add('E-mail', form.email)
  add('Telefone', form.phone)
  add('Tipo de evento', form.event_type)
  if (form.event_date) add('Data', form.event_date.split('-').reverse().join('/'))
  add('Convidados', form.guests)
  add('Duração do totem', planLabel(quoteState.hours))
  add('Jogos de interesse', form.games.join(', '))
  if (form.message) lines.push('', `Mensagem: ${form.message}`)

  return lines.join('\n')
}

const whatsappUrl = computed(() => whatsappLink(buildMessage()))

// (11) 91234-5678
function maskPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function clearErrors() {
  Object.keys(errors).forEach((key) => delete errors[key])
  errorMessage.value = ''
}

function validate() {
  clearErrors()
  if (!form.name) errors.name = 'Informe seu nome.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Informe um e-mail válido.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Informe um telefone com DDD.'
  return Object.keys(errors).length === 0
}

async function submit() {
  if (sending.value || !validate()) return
  sending.value = true

  let blocked = false
  try {
    await api.post('/contact-requests', {
      ...form,
      duration_hours: quoteState.hours,
      company: form.company || null,
      event_type: form.event_type || null,
      event_date: form.event_date || null,
      guests: form.guests || null,
      message: form.message || null,
    })
  } catch (err) {
    // Só dados inválidos barram o envio. Se o registro falhar por rede/servidor,
    // o pedido ainda segue pelo WhatsApp, que é o canal que importa.
    if (err.response?.status === 422) {
      blocked = true
      const fieldErrors = err.response.data?.errors || {}
      for (const [field, messages] of Object.entries(fieldErrors)) errors[field] = messages[0]
      errorMessage.value = 'Confira os campos destacados.'
    }
  } finally {
    sending.value = false
  }

  if (blocked) return
  sent.value = true
  window.open(whatsappUrl.value, '_blank', 'noopener')
}

function reset() {
  Object.assign(form, emptyForm())
  quoteState.hours = null
  clearErrors()
  sent.value = false
}
</script>
