 git push -u origin mainapz-markdown-dashboard/
├── apps/
│   ├── api/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── docs.js
│   │   │   ├── translations.js
│   │   │   └── notify.js
│   │   ├── notify/
│   │   │   ├── telegram.js
│   │   │   ├── discord.js
│   │   │   ├── messages.js
│   │   │   └── translationStatus.js
│   │   ├── utils/diff.js
│   │   ├── .env.example
│   │   └── Dockerfile
│   └── web/
│       ├── pages/
│       │   ├── index.js
│       │   ├── docs/[slug].js
│       │   └── admin/
│       │       ├── translations.js
│       │       ├── docs.js
│       │       ├── approvals.js
│       │       └── diff.js
│       ├── components/
│       │   ├── LanguageSwitcher.js
│       │   └── DiffViewer.js
│       ├── lib/i18n.js
│       ├── locales/
│       │   ├── fa.json
│       │   ├── en.json
│       │   └── ku.json
│       └── Dockerfile
├── docs/
│   ├── fa/
│   ├── en/
│   └── ku/
├── docs_pending/
│   ├── fa/
│   ├── en/
│   └── ku/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml
│       └── deploy-server.yml
├── ecosystem.config.js
├── docker-compose.yml
├── README.md
├── CONTRIBUTING.md
├── docs/monitoring.md
├── docs/server-test-checklist.md
└── .gitignore49d59a88f3796da8dff9e3ffb44d16fe31e91444# apz_chain