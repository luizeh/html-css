# Curso de HTML5 e CSS3 — Exercícios e Projetos

Repositório com os exercícios, desafios e projetos que desenvolvi ao longo do
curso de HTML5 e CSS3 (CursoEmVideo). Vai do primeiro documento HTML até
layouts responsivos com Flexbox e Grid.

## 🔗 Showcase (GitHub Pages)

Uma página-índice reúne tudo em um só lugar — projetos em destaque, exercícios
navegáveis por módulo e uma linha do tempo da evolução dos estudos:

**👉 https://luizeh.github.io/html-css/curso-showcase/**

> Publicação: ative o GitHub Pages em **Settings → Pages**, servindo a branch
> `main` a partir da raiz (`/`).

## 📚 Módulos

| Módulo | Tema | Conteúdo |
| ------ | ---- | -------- |
| `md01` | Fundamentos do HTML | Estrutura, textos, links, imagens e primeiros projetos |
| `md02` | Imagens & Semântica | Imagens adaptáveis (`<picture>`, `srcset`) e HTML semântico |
| `md03` | Tabelas | `colspan`/`rowspan`, agrupamento e tabelas responsivas |
| `md04` | Formulários, iframes & media queries | Campos e validação, incorporação de conteúdo, responsividade |
| `md05` | Flexbox & Grid | Layouts modernos e o projeto final de portfólio |

## 🚀 Projetos em destaque

- **Portfólio Pessoal** — `md05/desafio-final/`
- **Ena — Meus Vídeos** — `md01/ena/`
- **Escárnio & Abscôndito** — `md01/escarnio/`
- **História do Android** — `md02/android-website/`
- **Redes Sociais** — `md04/social2/`

## 💻 Rodando localmente

Como são páginas estáticas, basta abrir os arquivos `.html` no navegador.
Para simular o ambiente do GitHub Pages, sirva a raiz do projeto:

```bash
# a partir da raiz do repositório
python -m http.server 8000
# depois acesse http://localhost:8000/curso-showcase/
```

## 🗂️ Estrutura

```
.
├── curso-showcase/   # página-índice (HTML/CSS/JS puros)
├── md01/ … md05/     # exercícios e projetos por módulo
└── README.md
```

## 👤 Autor

Luizeh — [github.com/luizeh](https://github.com/luizeh)
