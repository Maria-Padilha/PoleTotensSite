// Versão sem som do composable do painel/totem. A demo do site roda com
// `sound_enabled: false`, então não vale carregar os ~650 KB de áudios só pra
// nunca tocarem. A API é a mesma do original pro jogo não precisar mudar.
const noop = () => {}

export function useGameSounds() {
  return {
    playCorrect: noop,
    playIncorrect: noop,
    playWin: noop,
    playLose: noop,
    playNeutral: noop,
    startCountdown: noop,
    stopCountdown: noop,
    startSpin: noop,
    stopSpin: noop,
  }
}
