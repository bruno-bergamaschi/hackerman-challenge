# Hackerman Challenge — 2na8

Este projeto foi desenvolvido como parte de um processo seletivo para a **2na8**.  
O objetivo é consumir a API pública **SWAPI (Star Wars API)** e exibir informações sobre personagens, planetas e naves, utilizando as tecnologias **Vue 3**, **Nuxt 4**, **Pinia**, **TypeScript** e **Sass (SCSS)**.

---

## 🚀 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Nuxt 4](https://nuxt.com/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass (SCSS)](https://sass-lang.com/)

## 🧱 Estrutura do Projeto

```markdown
A estrutura foi organizada para manter separação clara entre componentes, páginas, stores e estilos:

hackerman-challenge
├── .editorconfig
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── README.md
├── types/
│   └── nuxt.d.ts
└── app/
    ├── app.vue
    ├── assets/
    │   ├── img/
    │   │   ├── IconeStormTrooper.png
    │   │   ├── LogoStarWars.png
    │   │   └── StarWarsBackground.png
    │   └── styles/
    │       ├── default.scss
    │       └── variables.scss
    ├── components/
    │   ├── peopleData/
    │   │   ├── index.vue
    │   │   ├── section/
    │   │   │   ├── index.vue
    │   │   │   └── style.scss
    │   │   └── style.scss
    │   └── ui/
    │       ├── button/
    │       │   ├── index.vue
    │       │   ├── script.ts
    │       │   └── style.scss
    │       ├── card/
    │       │   ├── index.vue
    │       │   └── style.scss
    │       ├── input/
    │       │   ├── index.vue
    │       │   └── style.scss
    │       ├── loading/
    │       │   ├── index.vue
    │       │   └── style.scss
    │       └── tag/
    │           ├── index.vue
    │           └── style.scss
    ├── composables/
    │   ├── useClientStorage.ts
    │   └── useValidateEmail.ts
    ├── layouts/
    │   └── default.vue
    ├── middleware/
    │   └── validate-email.ts
    ├── pages/
    │   ├── index.vue
    │   ├── search/
    │   │   ├── index.vue
    │   │   └── style.scss
    │   └── style.scss
    ├── plugins/
    │   └── swapiApi.ts
    └── stores/
        ├── swapiApi/
        │   └── people.ts
        └── userEmail.ts
```

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/bruno-bergamaschi/hackerman-challenge.git
cd hackerman-challenge

```

### 2️⃣ Instalar dependências

```bash
pnpm install

```

### 3️⃣ Rodar o servidor de desenvolvimento

```bash
pnpm run dev

```

A aplicação estará disponível em: 👉 http://localhost:3000

---

## 🔐 Variáveis de Ambiente

O projeto utiliza variáveis de ambiente.

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
SWAPI_API_URL=https://swapi.dev/api
```
