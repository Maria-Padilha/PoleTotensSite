# Pole Totens — Site

Landing page pública do Pole Totens (Vue CLI + Tailwind). É um projeto separado do painel
(`PoleTotensFrontend`) porque roda em domínio próprio.

## Rodar

```
npm install
npm run serve     # http://localhost:8083
npm run build     # gera dist/ para publicar
```

## Configuração

`.env` (ou variáveis do ambiente de build):

```
VUE_APP_API_BASE_URL=https://api.seudominio.com/api
```

O site só usa um endpoint da API: `POST /contact-requests` (formulário de orçamento).
No backend, o domínio do site precisa estar em `CORS_ALLOWED_ORIGINS`
(ex.: `https://www.poletotens.com.br`).

## Onde editar

- Textos, jogos, planos, WhatsApp e lista de fotos/vídeos: `src/components/landing/content.js`
- Fotos e vídeos próprios: coloque em `public/landing/` e use o caminho (`/landing/arquivo.jpg`) em `media`.
- Demo jogável (caça-palavras): `src/components/landing/LandingDemo.vue`
  (o jogo em `src/games/caca-palavras/` é uma cópia do que existe no painel/totem).

Como é um site de página única, não usa vue-router: qualquer servidor estático serve o `dist/`.
