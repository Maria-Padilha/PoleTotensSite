import { computed } from 'vue'
import { ICON_MAP } from '@/components/iconMap'

// Tudo que vem da personalização genérica (tema/cor/fundo/logo/ícone/textos do
// início/cronômetro/sons) e é igual pra qualquer jogo — extraído do
// QuizPlayer.vue pra não duplicar em cada jogo novo. O painel admin sempre usa
// o mesmo conjunto de campos de personalização pra qualquer jogo, então essa
// lógica de "como esses campos viram estilo" também deve ser sempre a mesma.
export function useGameTheme(props) {
  const accentColor = computed(() => props.config?.primary_color || '#10939b')
  const timerSeconds = computed(() => props.config?.timer_seconds || null)
  const soundEnabled = computed(() => props.config?.sound_enabled !== false)
  const pointsPerQuestion = computed(() => props.config?.points_per_question || 10)

  const isDarkTheme = computed(() => props.config?.theme === 'escuro')
  const hasBackgroundImage = computed(() => Boolean(props.config?.background_url))

  // Texto solto (título/subtítulo/HUD/mensagens) — 4 combinações de
  // tema × ter foto de fundo, cada uma com o truque de contraste certo:
  // - tema escuro + foto: texto BRANCO com sombra escura forte — a técnica
  //   mais confiável contra uma imagem imprevisível (clara, escura, com
  //   textura), reforçada pela cortina escura em `containerStyle`.
  // - tema escuro sem foto: tinta escura elegante com halo CLARO sutil atrás
  //   — preferido explicitamente pelo usuário ("modo escuro muda os textos
  //   pra escuro também"); funciona bem aqui porque o degradê é liso e
  //   previsível, sem a variação de brilho que uma foto tem.
  // - tema claro + foto: tinta escura com halo CLARO forte (o espelho da
  //   primeira regra) — junto com a cortina clara em `containerStyle`, garante
  //   contraste mesmo se a foto enviada for escura.
  // - tema claro sem foto: tinta escura simples, sem sombra (fundo já é claro
  //   e liso, não precisa de reforço).
  const useLightText = computed(() => isDarkTheme.value && hasBackgroundImage.value)
  const hudTextStyle = computed(() => {
    if (useLightText.value) {
      return { color: '#ffffff', textShadow: '0 1px 10px rgba(0,0,0,0.45), 0 2px 24px rgba(0,0,0,0.4)' }
    }
    if (isDarkTheme.value) {
      return { color: '#2b2b2b', textShadow: '0 0 20px rgba(255,255,255,0.55), 0 0 6px rgba(255,255,255,0.45)' }
    }
    if (hasBackgroundImage.value) {
      return { color: '#2b2b2b', textShadow: '0 0 16px rgba(255,255,255,0.85), 0 1px 6px rgba(255,255,255,0.7)' }
    }
    return { color: '#2b2b2b' }
  })
  const hudSubTextStyle = computed(() => {
    if (useLightText.value) {
      return { color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 8px rgba(0,0,0,0.4), 0 2px 18px rgba(0,0,0,0.35)' }
    }
    if (isDarkTheme.value) {
      return { color: '#6b6b6b', textShadow: '0 0 16px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.4)' }
    }
    if (hasBackgroundImage.value) {
      return { color: '#6b6b6b', textShadow: '0 0 14px rgba(255,255,255,0.8), 0 1px 5px rgba(255,255,255,0.65)' }
    }
    return { color: '#6b6b6b' }
  })

  // Superfícies opacas (cards, alternativas, bolinha do ícone): escurecem
  // tanto com foto de fundo quanto com o tema escuro selecionado — aqui um
  // vidro/cartão escuro sempre lê melhor que branco puro nos dois casos,
  // então não precisa da mesma distinção fina do texto.
  const useDarkSurface = computed(() => hasBackgroundImage.value || isDarkTheme.value)
  const cardSurfaceClass = computed(() =>
    isDarkTheme.value ? 'border border-white/10 bg-mist-800' : 'bg-white/95'
  )
  const cardTextClass = computed(() => (isDarkTheme.value ? 'text-white' : 'text-ink'))
  const cardMutedClass = computed(() => (isDarkTheme.value ? 'text-white/55' : 'text-ink-soft'))
  const cardMuted2Class = computed(() => (isDarkTheme.value ? 'text-white/70' : 'text-ink-muted'))

  const containerStyle = computed(() => {
    const dark = isDarkTheme.value
    if (hasBackgroundImage.value) {
      // Cortina na cor do próprio tema por cima da foto — deixa a imagem ainda
      // visível mas sempre escura o bastante (tema escuro) ou clara o
      // bastante (tema claro) pro texto/vidro por cima continuar legível,
      // não importa se a foto enviada é clara, escura ou colorida.
      // Opacidade alta o bastante pra puxar até uma foto quase branca pra
      // dentro do tom escuro de verdade (~#05161a, igual ao card) — com uma
      // foto muito clara, a versão anterior (0.62-0.74) ainda deixava a
      // página visivelmente mais clara que o card escuro por cima dela.
      const scrim = dark
        ? 'linear-gradient(rgba(5,22,26,0.8), rgba(5,22,26,0.9))'
        : 'linear-gradient(rgba(252, 248, 245, 0.35), rgba(246, 242, 233, 0.4))'
      return {
        backgroundImage: `${scrim}, url(${props.config.background_url})`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
      }
    }
    return {
      background: dark
        ? 'radial-gradient(circle at 20% 20%, #0f6971 0%, #05161a 60%, #05161a 100%)'
        : 'radial-gradient(circle at 20% 20%, #d9e8e6 0%, #fcf8f5 45%, #f6f2e9 100%)',
    }
  })

  const startButtonText = computed(() => props.config?.start_button_text || 'Toque para começar')
  const startHintText = computed(() => props.config?.start_hint || 'Responda e veja sua pontuação no final')
  const startIconComponent = computed(() => ICON_MAP[props.config?.icon] || null)

  // Divisor ornamental (tela inicial, sobre o fundo da página): duas linhas que
  // desvanecem em direção ao losango central. Segue `isDarkTheme` puro (não
  // `useLightText`, que é só pro texto) — com a cortina em `containerStyle`,
  // o fundo da página sempre acompanha o tema escolhido, com ou sem foto.
  function dividerFadeStyle(reversed) {
    const c = isDarkTheme.value ? 'rgba(255,255,255,0.55)' : 'rgba(43,43,43,0.4)'
    const dir = reversed ? 'to left' : 'to right'
    return { background: `linear-gradient(${dir}, transparent, ${c})` }
  }

  // Mesmo divisor, mas calibrado pela cor do card (branco/escuro) em vez do
  // fundo da página — pra divisores que vivem dentro de uma superfície opaca.
  function cardDividerFadeStyle(reversed) {
    const c = isDarkTheme.value ? 'rgba(255,255,255,0.35)' : 'rgba(43,43,43,0.25)'
    const dir = reversed ? 'to left' : 'to right'
    return { background: `linear-gradient(${dir}, transparent, ${c})` }
  }

  const buttonStyle = computed(() => ({
    backgroundColor: accentColor.value,
    backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
    borderColor: 'rgba(255,255,255,0.25)',
    
  }))

  // Botão "fantasma" (ex: "Voltar ao início"): só contorno, cor de texto igual
  // ao resto do texto solto da tela — não usa a cor de acento pra não competir
  // com um botão sólido ao lado.
  const outlineButtonStyle = computed(() => ({
    borderColor: isDarkTheme.value ? 'rgba(255,255,255,0.4)' : 'rgba(43,43,43,0.25)',
    color: hudTextStyle.value.color,
  }))

  // Cor do cronômetro circular: verde no começo, laranja da metade em diante,
  // vermelho nos últimos 4s. Recebe o ref de `timeLeft` de fora porque isso é
  // estado do jogo, não da personalização.
  function timerColorFor(timeLeftRef) {
    return computed(() => {
      if (!timerSeconds.value) return accentColor.value
      if (timeLeftRef.value <= 4) return '#ef4444'
      if (timeLeftRef.value <= timerSeconds.value / 2) return '#f59e0b'
      return '#22c55e'
    })
  }

  // Bônus por velocidade: responder rápido rende mais pontos — de 100% da
  // pontuação base (resposta instantânea) até `minMultiplier` dela (resposta
  // no último segundo do cronômetro). Só se aplica quando a rodada tem
  // cronômetro configurado; sem cronômetro não tem como medir "mais
  // rápido", então fica na pontuação cheia de sempre.
  //
  // `minMultiplier` controla o quanto o tempo pesa: 0.5 (padrão, usado em
  // quiz/verdadeiro-ou-falso/forca) é um bônus moderado sobre uma pontuação
  // por resposta que já é o essencial do jogo. Caça-palavras e jogo da
  // memória usam um valor bem menor (pedido explícito do usuário: esses
  // dois jogos dependem muito mais do tempo do que de pontuação fixa),
  // deixando achar/casar rápido valer muito mais que achar/casar no fim do
  // cronômetro.
  function pointsWithSpeedBonus(basePoints, timeLeft, minMultiplier = 0.5) {
    if (!timerSeconds.value || timeLeft == null) return basePoints
    const ratio = Math.max(0, Math.min(1, timeLeft / timerSeconds.value))
    const multiplier = minMultiplier + (1 - minMultiplier) * ratio
    return Math.max(1, Math.round(basePoints * multiplier))
  }

  // Brilho clean nas bordas ao acertar/errar/neutro. Recebe o ref de `flash`
  // ('correct' | 'incorrect' | 'neutral' | null) de fora pelo mesmo motivo.
  function glowStyleFor(flashRef) {
    return computed(() => {
      if (!flashRef.value) return { opacity: 0 }
      const rgb =
        flashRef.value === 'correct' ? '34,197,94' : flashRef.value === 'neutral' ? '245,158,11' : '239,68,68'
      return {
        opacity: 1,
        boxShadow: `inset 0 0 40px 16px rgba(${rgb},0.5), inset 0 0 280px 100px rgba(${rgb},0.26)`,
      }
    })
  }

  return {
    accentColor,
    timerSeconds,
    soundEnabled,
    pointsPerQuestion,
    isDarkTheme,
    hasBackgroundImage,
    useLightText,
    useDarkSurface,
    hudTextStyle,
    hudSubTextStyle,
    cardSurfaceClass,
    cardTextClass,
    cardMutedClass,
    cardMuted2Class,
    containerStyle,
    startButtonText,
    startHintText,
    startIconComponent,
    dividerFadeStyle,
    cardDividerFadeStyle,
    buttonStyle,
    outlineButtonStyle,
    timerColorFor,
    glowStyleFor,
    pointsWithSpeedBonus,
  }
}
