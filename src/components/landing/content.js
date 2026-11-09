import {
  HelpCircle,
  ThumbsUp,
  Type,
  Search,
  Gift,
  Layers,
  Mic,
  Trophy,
  Users,
  Palette,
  BarChart3,
  Lock,
  Monitor,
  Sparkles,
  Wand2,
  Zap,
} from '@lucide/vue'

export const games = [
  {
    slug: 'quiz',
    name: 'Quiz',
    icon: HelpCircle,
    tagline: 'Perguntas com a cara do evento',
    text: 'Perguntas e respostas personalizadas, com cronômetro e mais pontos para quem responde mais rápido.',
  },
  {
    slug: 'verdadeiro-ou-falso',
    name: 'Verdadeiro ou Falso',
    icon: ThumbsUp,
    tagline: 'Rápido, simples, viciante',
    text: 'Afirmações sobre a sua marca, o produto ou o evento. O convidado decide em segundos.',
  },
  {
    slug: 'forca',
    name: 'Jogo da Forca',
    icon: Type,
    tagline: 'Um clássico que todo mundo conhece',
    text: 'Adivinhe a palavra antes de acabarem as chances, com dicas e imagens que você escolhe.',
  },
  {
    slug: 'caca-palavras',
    name: 'Caça-Palavras',
    icon: Search,
    tagline: 'Palavras da sua marca escondidas',
    text: 'Esconda o nome do patrocinador, valores ou termos do evento num tabuleiro de letras. Com cronômetro.',
  },
  {
    slug: 'roleta-de-brindes',
    name: 'Roleta',
    icon: Gift,
    tagline: 'Prêmios, desafios e decisões',
    text: 'Roleta giratória com prêmios e chances configuráveis. Ótima para brindes e para atrair gente ao estande.',
  },
  {
    slug: 'jogo-da-memoria',
    name: 'Jogo da Memória',
    icon: Layers,
    tagline: 'Cartas com as suas imagens',
    text: 'Encontre os pares em cartas com a logo, o produto ou as fotos do evento.',
  },
  {
    slug: 'karaoke',
    name: 'Karaokê',
    icon: Mic,
    tagline: 'Letra palavra por palavra',
    text: 'Letra sincronizada, nota pela voz e pelo ritmo, ranking por apresentação e replay de quem cantou.',
  },
]

export const pillars = [
  {
    icon: Monitor,
    title: 'Totem pronto para o evento',
    text: 'Abre no navegador em modo quiosque, com senha, vários jogos no mesmo totem e modo atração quando ninguém está jogando.',
  },
  {
    icon: Palette,
    title: 'Tudo com a sua marca',
    text: 'Logo, cores, imagem de fundo, textos e sons. Cada jogo é personalizado para o evento, sem parecer de prateleira.',
  },
  {
    icon: BarChart3,
    title: 'Dados de verdade no final',
    text: 'Ranking em tempo real, lista de leads para baixar e um recap animado do evento para compartilhar.',
  },
]

export const features = [
  { icon: Trophy, title: 'Ranking ao vivo', text: 'Disputa na tela do totem, por jogo e geral.' },
  { icon: Users, title: 'Captação de leads', text: 'Nome, telefone, e-mail e Instagram antes de jogar. Lista pronta para baixar.' },
  { icon: Sparkles, title: 'Recap do evento', text: 'Uma retrospectiva animada com números, ranking e destaques.' },
  { icon: Monitor, title: 'Modo atração', text: 'Com o totem parado, a tela chama atenção com o ranking e os destaques.' },
  { icon: Lock, title: 'Acesso protegido', text: 'Senha no totem e por evento, para ninguém mexer onde não deve.' },
  { icon: Wand2, title: 'Preview e aprovação', text: 'Você vê e aprova o jogo antes de ir para o totem.' },
]

export const steps = [
  {
    title: 'Conversamos sobre o seu evento',
    text: 'Você conta o tipo de evento, o público e o objetivo. A gente sugere os jogos e o formato do totem.',
  },
  {
    title: 'Personalizamos os jogos',
    text: 'Perguntas, palavras, prêmios, músicas, cores e logo. Você recebe um link de preview para aprovar.',
  },
  {
    title: 'O totem entra em ação',
    text: 'Os convidados jogam, entram no ranking e deixam seus dados. Tudo é registrado em tempo real.',
  },
  {
    title: 'Você recebe os resultados',
    text: 'Lista de leads, ranking final e o recap do evento, prontos para usar e compartilhar.',
  },
]

export const quickChips = [
  { icon: Zap, label: 'Ranking em tempo real' },
  { icon: Users, label: 'Captação de leads' },
]

// Fotos e vídeos da galeria. Por enquanto são imagens de banco gratuito (Pexels,
// uso livre) só pra ilustrar. Pra trocar pelos seus: ponha os arquivos em
// `public/landing/` e use o caminho em `src` (ex: '/landing/totem-evento.jpg');
// nos vídeos, `poster` é a imagem de capa.
const PEXELS_PHOTO = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
const PEXELS_VIDEO = (id, file) => `https://videos.pexels.com/video-files/${id}/${file}`

export const media = [
  {
    type: 'video',
    title: 'Diversão no estande',
    caption: 'Convidados jogando e disputando',
    src: PEXELS_VIDEO(9834662, '9834662-hd_1280_720_24fps.mp4'),
    poster: 'https://images.pexels.com/videos/9834662/bowding-cocktails-family-fun-9834662.jpeg',
  },
  { type: 'photo', title: 'Roleta de brindes', caption: 'Prêmios e atração para o evento', src: PEXELS_PHOTO(37748388) },
  { type: 'photo', title: 'Competição entre amigos', caption: 'Quem faz mais pontos?', src: PEXELS_PHOTO(7915382) },
  {
    type: 'video',
    title: 'Karaokê',
    caption: 'Cantando juntos com a letra na tela',
    src: PEXELS_VIDEO(6761267, '6761267-hd_1280_720_25fps.mp4'),
    poster: 'https://images.pexels.com/videos/6761267/pexels-photo-6761267.jpeg',
  },
  { type: 'photo', title: 'Jogo da memória', caption: 'Cartas e diversão em grupo', src: PEXELS_PHOTO(8111370) },
  { type: 'photo', title: 'Comemoração', caption: 'O ranking sai, a festa começa', src: PEXELS_PHOTO(7693713) },
  {
    type: 'video',
    title: 'Para todas as idades',
    caption: 'Jogos que reúnem a família',
    src: PEXELS_VIDEO(9833851, '9833851-hd_1280_720_24fps.mp4'),
    poster: 'https://images.pexels.com/videos/9833851/bowding-cocktails-family-fun-9833851.jpeg',
  },
]

export const eventTypes = [
  'Evento corporativo',
  'Feira / congresso',
  'Ativação de marca',
  'Confraternização',
  'Casamento / festa',
  'Evento escolar',
  'Outro',
]

// WhatsApp Business que recebe os pedidos de orçamento.
export const WHATSAPP_NUMBER = '5565984391860'
export const WHATSAPP_LABEL = '(65) 98439-1860'

export function whatsappLink(text = '') {
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

// Planos por duração do evento. A cada hora a mais, 1 jogo extra de graça:
// 2h = 1 jogo grátis, 3h = 2, 4h = 3.
export const plans = [
  { hours: 2, tagline: 'Para eventos curtos', freeGames: 1, popular: false },
  { hours: 3, tagline: 'O mais escolhido', freeGames: 2, popular: true },
  { hours: 4, tagline: 'Para eventos longos', freeGames: 3, popular: false },
]

export const planIncludes = [
  'Jogos personalizados com a sua marca',
  'Ranking em tempo real no totem',
  'Captação de leads com lista para baixar',
  'Recap animado do evento',
]

export function planLabel(hours) {
  const plan = plans.find((p) => p.hours === Number(hours))
  if (!plan) return ''
  return `${plan.hours} horas (${plan.freeGames} ${plan.freeGames === 1 ? 'jogo grátis' : 'jogos grátis'})`
}
