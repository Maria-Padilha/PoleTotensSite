import {
  Sparkles,
  Heart,
  HeartHandshake,
  Star,
  Gift,
  PartyPopper,
  Balloon,
  Cake,
  Crown,
  Trophy,
  Medal,
  Gamepad2,
  Music,
  Camera,
  Flower2,
  Gem,
  Sun,
  Moon,
  Rainbow,
  ThumbsUp,
} from '@lucide/vue'

// Catálogo curado de ícones pra tela inicial dos jogos (ex: avatar do Quiz
// quando não há logo). Compartilhado entre `IconPicker.vue` (admin escolhe) e
// os jogos que renderizam o ícone escolhido a partir da chave salva.
export const ICONS = [
  { key: 'sparkles', label: 'Brilho', component: Sparkles },
  { key: 'heart', label: 'Coração', component: Heart },
  { key: 'heart-handshake', label: 'União', component: HeartHandshake },
  { key: 'star', label: 'Estrela', component: Star },
  { key: 'gift', label: 'Presente', component: Gift },
  { key: 'party-popper', label: 'Festa', component: PartyPopper },
  { key: 'balloon', label: 'Balão', component: Balloon },
  { key: 'cake', label: 'Bolo', component: Cake },
  { key: 'crown', label: 'Coroa', component: Crown },
  { key: 'trophy', label: 'Troféu', component: Trophy },
  { key: 'medal', label: 'Medalha', component: Medal },
  { key: 'gamepad-2', label: 'Jogo', component: Gamepad2 },
  { key: 'music', label: 'Música', component: Music },
  { key: 'camera', label: 'Câmera', component: Camera },
  { key: 'flower-2', label: 'Flor', component: Flower2 },
  { key: 'gem', label: 'Joia', component: Gem },
  { key: 'sun', label: 'Sol', component: Sun },
  { key: 'moon', label: 'Lua', component: Moon },
  { key: 'rainbow', label: 'Arco-íris', component: Rainbow },
  { key: 'thumbs-up', label: 'Curtida', component: ThumbsUp },
]

export const ICON_MAP = Object.fromEntries(ICONS.map((i) => [i.key, i.component]))
