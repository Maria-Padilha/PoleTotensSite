<template>
  <div class="relative min-h-screen overflow-hidden" :style="containerStyle">
    <!-- brilho clean nas bordas: acende verde ao encontrar uma palavra -->
    <div class="pointer-events-none fixed inset-0 z-40 transition-all duration-700 ease-out" :style="glowStyle" />

    <img
      v-if="config.logo_url"
      :src="config.logo_url"
      alt="Logo"
      class="absolute left-6 top-6 z-10 h-14 object-contain sm:left-10 sm:top-10 sm:h-20"
    />

    <!-- tela inicial -->
    <div
      v-if="phase === 'start'"
      class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      :style="phasePadding"
    >
      <div
        v-if="!config.logo_url && startIconComponent"
        class="mb-10 flex h-36 w-36 items-center justify-center rounded-full shadow-lg sm:h-48 sm:w-48"
        :class="isDarkTheme ? 'border border-white/10 bg-primary-900/70' : 'bg-white/90'"
      >
        <component :is="startIconComponent" :size="100" :style="{ color: accentColor }" />
      </div>

      <h1 class="font-elegant text-7xl font-bold leading-[1.05] tracking-tight sm:text-9xl" :style="hudTextStyle">
        <HighlightedText :text="title" :color="accentColor" />
      </h1>
      <h2
        v-if="config.headline"
        class="font-elegant mt-2 text-6xl font-bold leading-[1.05] tracking-tight sm:text-8xl"
        :style="hudTextStyle"
      >
        <HighlightedText :text="config.headline" :color="accentColor" />
      </h2>

      <div v-if="config.headline || config.subtitle" class="mt-8 flex items-center justify-center gap-4">
        <span class="h-px w-20 sm:w-28" :style="dividerFadeStyle(false)" />
        <span
          class="h-2.5 w-2.5 rotate-45"
          :style="{ backgroundColor: accentColor, boxShadow: `0 0 12px ${accentColor}99` }"
        />
        <span class="h-px w-20 sm:w-28" :style="dividerFadeStyle(true)" />
      </div>

      <p
        v-if="config.subtitle"
        class="font-elegant mt-5 text-3xl italic tracking-wide sm:text-5xl w-[70%]"
        :style="hudSubTextStyle"
      >
        <HighlightedText :text="config.subtitle" :color="accentColor" />
      </p>

      <template v-if="hasWords">
        <button
          class="mt-9 rounded-2xl border px-16 py-8 text-3xl font-bold tracking-wide text-white
            transition-transform active:scale-95 sm:text-4xl"
          :style="buttonStyle"
          @click="start"
        >
          <HighlightedText :text="startButtonText" variant="underline" />
        </button>
        <p class="mt-5 flex items-center gap-2 text-base opacity-60 sm:text-lg" :style="hudSubTextStyle">
          <MousePointerClick :size="18" class="shrink-0" />
          <HighlightedText :text="startHintText" :color="accentColor" />
        </p>
      </template>
      <p v-else class="mt-6 text-2xl" :style="hudSubTextStyle">
        Este jogo ainda não tem palavras cadastradas.
      </p>
    </div>

    <!-- jogando -->
    <div
      v-else-if="phase === 'playing'"
      class="relative z-10 flex min-h-screen flex-col px-6 py-8 sm:px-20 sm:py-12"
      :style="phasePadding"
    >
      <div class="flex items-center justify-between text-sm font-bold uppercase tracking-[0.2em] sm:text-2xl" :style="hudTextStyle">
        <span class="inline-flex items-center gap-2">
          <Search :size="24" class="shrink-0 opacity-80" />
          Encontradas {{ correctCount }} de {{ totalWords }}
        </span>
        <span class="inline-flex items-center gap-2">
          <Star :size="24" class="shrink-0 opacity-80" />
          {{ points }} pontos
        </span>
      </div>

      <div class="flex flex-1 flex-col items-center justify-center py-6">
        <div
          class="relative w-full max-w-[1650px] rounded-[2.5rem] p-8 text-center shadow-2xl backdrop-blur sm:p-16"
          :class="cardSurfaceClass"
        >
          <div
            v-if="timerSeconds"
            class="absolute right-5 top-4 flex h-16 w-16 items-center justify-center rounded-full shadow-md
              sm:right-10 sm:top-8 sm:h-28 sm:w-28"
            :class="cardSurfaceClass"
          >
            <svg viewBox="0 0 56 56" class="absolute inset-0 h-full w-full -rotate-90 p-1.5">
              <circle cx="28" cy="28" r="24" fill="none" :stroke="isDarkTheme ? 'rgba(255,255,255,0.15)' : '#e9e9e6'" stroke-width="5" />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                :stroke="timerColor"
                stroke-width="5"
                stroke-linecap="round"
                :stroke-dasharray="timerCircumference"
                :stroke-dashoffset="timerDashOffset"
                style="transition: stroke-dashoffset 1s linear, stroke 0.3s ease"
              />
            </svg>
            <span class="relative text-lg font-bold sm:text-4xl" :style="{ color: timerColor }">
              {{ timeLeft }}
            </span>
          </div>

          <span class="text-sm font-bold uppercase tracking-[0.3em] sm:text-3xl" :class="cardMutedClass">
            Encontre as palavras
          </span>

          <div
            ref="gridRef"
            class="relative mx-auto mt-20 grid aspect-square w-full max-w-[640px] select-none grid-cols-12 gap-2 sm:mt-20 sm:max-w-[1480px] sm:gap-5"
            style="touch-action: none"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <template v-for="(row, r) in gridLetters" :key="r">
              <div
                v-for="(letter, c) in row"
                :key="c"
                class="flex items-center justify-center rounded-xl text-base font-bold uppercase transition-colors
                  sm:rounded-2xl sm:text-3xl"
                :class="cellClass(r, c)"
                :style="cellStyle(r, c)"
              >
                {{ letter }}
              </div>
            </template>
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-14 sm:gap-4">
            <span
              v-for="w in placedWords"
              :key="w.id"
              class="inline-flex items-center gap-2 rounded-full border-2 px-2 py-2.5 text-base font-bold
                transition-all sm:px-10 sm:py-5 sm:text-2xl"
              :class="w.found ? 'border-green-400 bg-green-500/20 text-green-400 line-through opacity-70' : wordChipIdleClass"
            >
              <Check v-if="w.found" :size="28" class="shrink-0" />
              {{ w.display }}
            </span>
          </div>
        </div>

        <p
          class="mt-9 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em]
            opacity-60 sm:text-xl"
          :style="hudSubTextStyle"
        >
          <MousePointerClick :size="20" class="shrink-0" />
          Arraste o dedo sobre as letras
        </p>
      </div>
    </div>

    <!-- resultado -->
    <div
      v-else
      class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center"
      :style="phasePadding"
    >
      <div
        class="relative w-full max-w-xl rounded-[2.5rem] p-10 pt-14 shadow-2xl backdrop-blur sm:p-12 sm:pt-16"
        :class="cardSurfaceClass"
      >
        <div
          class="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center
            rounded-full shadow-md sm:-top-9 sm:h-20 sm:w-20"
          :class="cardSurfaceClass"
        >
          <Trophy :size="30" class="sm:hidden" :style="{ color: accentColor }" />
          <Trophy :size="36" class="hidden sm:block" :style="{ color: accentColor }" />
        </div>

        <p
          class="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] sm:text-sm"
          :class="cardMutedClass"
        >
          <span :style="{ color: accentColor }">•</span> Seu resultado <span :style="{ color: accentColor }">•</span>
        </p>
        <p class="font-elegant mt-3 flex items-baseline justify-center gap-2 text-5xl font-bold sm:text-6xl">
          <span :style="{ color: accentColor }">{{ points }}</span>
          <span class="text-2xl sm:text-3xl" :class="cardMutedClass">/{{ maxPoints }}</span>
          <span class="text-lg font-sans font-normal sm:text-xl" :class="cardMuted2Class">pontos</span>
        </p>
        <div class="mx-auto mt-4 h-px w-24" :style="{ backgroundColor: accentColor, opacity: 0.3 }" />
        <p class="mt-4 text-sm sm:text-base" :class="cardMuted2Class">
          Você encontrou {{ correctCount }} de {{ totalWords }} palavras.
        </p>
      </div>

      <p class="font-elegant mt-12 text-4xl font-bold sm:text-6xl w-[80%]" :style="hudTextStyle">
        <HighlightedText :text="resultMessage" :color="accentColor" />
      </p>
      <p class="mt-3 text-xl sm:text-2xl" :style="hudSubTextStyle">Obrigado por jogar!</p>

      <div class="mt-12 flex w-full max-w-xl flex-col items-stretch gap-5">
        <button
          class="inline-flex items-center justify-center gap-4 rounded-2xl px-14 py-8 text-3xl font-extrabold
            text-white shadow-xl transition-transform active:scale-[0.98] sm:text-4xl"
          :style="{ backgroundColor: accentColor }"
          @click="restart"
        >
          <RotateCcw :size="36" /> Jogar novamente
        </button>
        <button
          class="inline-flex items-center justify-center gap-4 rounded-2xl border-2 px-14 py-8 text-3xl
            font-extrabold shadow-lg transition-transform active:scale-[0.98] sm:text-4xl"
          :style="outlineButtonStyle"
          @click="backToStart"
        >
          <Home :size="36" /> Voltar ao início
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, watch } from 'vue'
import { RotateCcw, Trophy, MousePointerClick, Search, Star, Home, Check } from '@lucide/vue'
import HighlightedText from '@/components/HighlightedText.vue'
import { useGameSounds } from '@/composables/useGameSounds'
import { useGameTheme } from '@/composables/useGameTheme'

const props = defineProps({
  title: { type: String, default: 'Caça-Palavras' },
  config: { type: Object, default: () => ({}) },
  // espaço reservado no topo pra não ficar embaixo de uma barra fixa externa
  // (ex: o "Preview do jogo" da PreviewView) — no totem, sem barra, fica 0.
  topInset: { type: Number, default: 0 },
})

const emit = defineEmits(['finished', 'restarted', 'back-to-start'])

const phasePadding = computed(() => ({ paddingTop: `${props.topInset}px` }))

const GRID_SIZE = 12
// só direções "pra frente" (sem inverso) — mais fácil de achar num totem que
// convidados usam rapidamente, sem complicar demais a busca.
const DIRECTIONS = [
  { dr: 0, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 },
]
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const TIMER_RADIUS = 24
const timerCircumference = 2 * Math.PI * TIMER_RADIUS

const configuredWords = computed(() => props.config?.words || [])
const hasWords = computed(() => configuredWords.value.length > 0)

const {
  accentColor,
  timerSeconds,
  soundEnabled,
  pointsPerQuestion,
  isDarkTheme,
  hasBackgroundImage,
  hudTextStyle,
  hudSubTextStyle,
  cardSurfaceClass,
  cardMutedClass,
  cardMuted2Class,
  containerStyle,
  startButtonText,
  startHintText,
  startIconComponent,
  dividerFadeStyle,
  buttonStyle,
  outlineButtonStyle,
  timerColorFor,
  glowStyleFor,
  pointsWithSpeedBonus,
} = useGameTheme(props)

const { playCorrect, playIncorrect, playWin, playLose, startCountdown, stopCountdown } = useGameSounds(soundEnabled)

// pedido explícito do usuário: cada seleção errada custa 3s do cronômetro
// (só faz sentido quando a instância tem cronômetro configurado).
const WRONG_PENALTY_SECONDS = 3

const phase = ref('start')
const gridRef = ref(null)
const gridLetters = ref([])
const placedWords = ref([])
const locked = ref(false)
const timeLeft = ref(timerSeconds.value || 0)
const flash = ref(null)
const earnedPoints = ref(0)
let intervalId = null
let flashTimeoutId = null
let wrongTimeoutId = null

const isSelecting = ref(false)
const selectionStart = ref(null)
const selectionCurrent = ref(null)
const wrongCells = ref([])

const correctCount = computed(() => placedWords.value.filter((w) => w.found).length)
const totalWords = computed(() => placedWords.value.length)
const allFound = computed(() => totalWords.value > 0 && correctCount.value === totalWords.value)
const points = computed(() => earnedPoints.value)
const maxPoints = computed(() => totalWords.value * pointsPerQuestion.value)

const timerDashOffset = computed(() => {
  if (!timerSeconds.value) return 0
  const ratio = Math.max(0, timeLeft.value / timerSeconds.value)
  return timerCircumference * (1 - ratio)
})
const timerColor = timerColorFor(timeLeft)

const won = computed(() => {
  if (!totalWords.value) return false
  const percent = (correctCount.value / totalWords.value) * 100
  const threshold = props.config?.win_threshold ?? 60
  return percent >= threshold
})

const resultMessage = computed(() => {
  if (won.value) return props.config?.win_message || 'Mandou muito bem, parabéns!'
  return props.config?.lose_message || 'Quase lá! Bora tentar de novo?'
})

const wordChipIdleClass = computed(() => (isDarkTheme.value ? 'border-white/25 text-white/85' : 'border-ink/15 text-ink'))

const glowStyle = glowStyleFor(flash)

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function extractLetters(raw) {
  return (raw || '').toUpperCase().replace(/[^\p{L}]/gu, '').split('')
}

// Monta um tabuleiro novo a cada início/replay: posiciona as palavras que
// couberem (em linha reta, 4 direções, permitindo cruzamentos com letra
// igual) e preenche o resto com letras aleatórias.
function buildPuzzle() {
  const size = GRID_SIZE
  const grid = Array.from({ length: size }, () => Array(size).fill(null))

  const source = configuredWords.value
    .map((w) => ({ id: w.id, display: (w.word || '').trim().toUpperCase(), letters: extractLetters(w.word) }))
    .filter((w) => w.letters.length > 0 && w.letters.length <= size)
    .sort((a, b) => b.letters.length - a.letters.length)

  const placed = []

  source.forEach((w) => {
    const L = w.letters.length
    for (let attempt = 0; attempt < 300; attempt++) {
      const dir = DIRECTIONS[randInt(0, DIRECTIONS.length - 1)]
      const rowMax = size - 1 - dir.dr * (L - 1)
      const colMin = dir.dc === -1 ? L - 1 : 0
      const colMax = dir.dc === 1 ? size - 1 - (L - 1) : size - 1
      const row = randInt(0, rowMax)
      const col = randInt(colMin, colMax)

      const cells = []
      let ok = true
      for (let i = 0; i < L; i++) {
        const r = row + dir.dr * i
        const c = col + dir.dc * i
        const existing = grid[r][c]
        if (existing && existing !== w.letters[i]) {
          ok = false
          break
        }
        cells.push({ row: r, col: c })
      }
      if (!ok) continue

      cells.forEach((cell, i) => {
        grid[cell.row][cell.col] = w.letters[i]
      })
      placed.push({ id: w.id, display: w.display, cells, found: false })
      return
    }
  })

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = ALPHABET[randInt(0, ALPHABET.length - 1)]
    }
  }

  gridLetters.value = grid
  placedWords.value = placed
}

function cellKey(r, c) {
  return `${r}-${c}`
}

const foundCellKeys = computed(() => {
  const set = new Set()
  placedWords.value.forEach((w) => {
    if (w.found) w.cells.forEach((cell) => set.add(cellKey(cell.row, cell.col)))
  })
  return set
})

const wrongCellKeys = computed(() => new Set(wrongCells.value.map((cell) => cellKey(cell.row, cell.col))))

function pathBetween(start, end) {
  const dr = end.row - start.row
  const dc = end.col - start.col
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null
  const steps = Math.max(Math.abs(dr), Math.abs(dc))
  const stepR = Math.sign(dr)
  const stepC = Math.sign(dc)
  const cells = []
  for (let i = 0; i <= steps; i++) {
    cells.push({ row: start.row + stepR * i, col: start.col + stepC * i })
  }
  return cells
}

const liveSelectedKeys = computed(() => {
  if (!isSelecting.value || !selectionStart.value || !selectionCurrent.value) return new Set()
  const path = pathBetween(selectionStart.value, selectionCurrent.value) || [selectionStart.value]
  return new Set(path.map((cell) => cellKey(cell.row, cell.col)))
})

function cellVisualState(r, c) {
  const key = cellKey(r, c)
  if (foundCellKeys.value.has(key)) return 'found'
  if (wrongCellKeys.value.has(key)) return 'wrong'
  if (liveSelectedKeys.value.has(key)) return 'active'
  return 'idle'
}

function cellClass(r, c) {
  const state = cellVisualState(r, c)
  if (state !== 'idle') return 'text-white'
  if (isDarkTheme.value) return 'bg-white/10 text-white'
  if (hasBackgroundImage.value) return 'bg-white/55 text-ink'
  return 'border border-ink/10 bg-white text-ink'
}

function cellStyle(r, c) {
  const state = cellVisualState(r, c)
  if (state === 'found') return { backgroundColor: accentColor.value }
  if (state === 'wrong') return { backgroundColor: '#ef4444' }
  if (state === 'active') return { backgroundColor: accentColor.value, opacity: 0.55 }
  return {}
}

function cellFromEvent(e) {
  if (!gridRef.value) return null
  const rect = gridRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const col = Math.floor((x / rect.width) * GRID_SIZE)
  const row = Math.floor((y / rect.height) * GRID_SIZE)
  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null
  return { row, col }
}

function cellsEqual(a, b) {
  return a.length === b.length && a.every((cell, i) => cell.row === b[i].row && cell.col === b[i].col)
}

function findMatch(path) {
  const reversed = [...path].reverse()
  return placedWords.value.find((w) => !w.found && (cellsEqual(w.cells, path) || cellsEqual(w.cells, reversed)))
}

function onPointerDown(e) {
  if (locked.value) return
  const cell = cellFromEvent(e)
  if (!cell) return
  gridRef.value?.setPointerCapture?.(e.pointerId)
  isSelecting.value = true
  selectionStart.value = cell
  selectionCurrent.value = cell
}

function onPointerMove(e) {
  if (!isSelecting.value) return
  const cell = cellFromEvent(e)
  if (cell) selectionCurrent.value = cell
}

function onPointerUp() {
  if (!isSelecting.value) return
  isSelecting.value = false
  const start = selectionStart.value
  const end = selectionCurrent.value
  selectionStart.value = null
  selectionCurrent.value = null
  if (!start || !end || locked.value) return

  const path = pathBetween(start, end)
  if (!path || path.length < 2) return

  const match = findMatch(path)
  if (match) {
    match.found = true
    // tempo pesa muito mais que a pontuação fixa nesse jogo (pedido
    // explícito do usuário) — achar rápido vale bem mais que no fim do tempo.
    earnedPoints.value += pointsWithSpeedBonus(pointsPerQuestion.value, timeLeft.value, 0.15)
    triggerFlash('correct')
    playCorrect()
    if (allFound.value) finishRound()
  } else {
    triggerFlash('incorrect')
    playIncorrect()
    applyWrongPenalty()
    if (wrongTimeoutId) clearTimeout(wrongTimeoutId)
    wrongCells.value = path
    wrongTimeoutId = setTimeout(() => {
      wrongCells.value = []
    }, 450)
  }
}

function applyWrongPenalty() {
  if (!timerSeconds.value || !intervalId) return
  timeLeft.value = Math.max(0, timeLeft.value - WRONG_PENALTY_SECONDS)
  if (timeLeft.value <= 0) {
    stopTimer()
    if (!locked.value) finishRound()
  }
}

function triggerFlash(kind) {
  flash.value = kind
  if (flashTimeoutId) clearTimeout(flashTimeoutId)
  flashTimeoutId = setTimeout(() => {
    flash.value = null
  }, 800)
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  stopCountdown()
}

// Aqui o cronômetro vale pro quebra-cabeça inteiro (não por palavra) — quando
// zera, encerra a rodada com o que já foi encontrado até então.
function startTimer() {
  stopTimer()
  if (!timerSeconds.value) return
  timeLeft.value = timerSeconds.value
  startCountdown()
  intervalId = setInterval(() => {
    timeLeft.value -= 1
    if (timeLeft.value <= 0) {
      stopTimer()
      if (!locked.value) finishRound()
    }
  }, 1000)
}

function finishRound() {
  locked.value = true
  stopTimer()
  setTimeout(() => {
    phase.value = 'finished'
    if (won.value) playWin()
    else playLose()
  }, 1200)
}

function start() {
  buildPuzzle()
  locked.value = false
  wrongCells.value = []
  earnedPoints.value = 0
  phase.value = 'playing'
  startTimer()
  emit('restarted')
}

function restart() {
  start()
}

function backToStart() {
  stopTimer()
  locked.value = false
  phase.value = 'start'
  emit('back-to-start')
}

watch(
  () => phase.value,
  (value) => {
    if (value !== 'playing') stopTimer()
    if (value === 'finished') emit('finished', { score: points.value, maxScore: maxPoints.value, won: won.value })
  }
)

onUnmounted(() => {
  stopTimer()
  if (flashTimeoutId) clearTimeout(flashTimeoutId)
  if (wrongTimeoutId) clearTimeout(wrongTimeoutId)
})
</script>
