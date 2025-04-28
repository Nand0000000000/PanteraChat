# Pantera Chat 🐆  
Chatbot em tempo real para fãs da **FURIA** (CS 2), feito em React + Tailwind com backend Node + Express.  
Responde via IA (GPT / alternativos) e possui comandos locais de estatísticas e calendário de partidas.

---

## ✨ Funcionalidades

| Frontend | Backend |
|----------|---------|
| Chat em tempo real (WebSocket opcional) | Rota `/chat` com IA |
| Comandos `/proximo`, `/stats <nick>` | Integração HLTV para partidas e stats |
| Tema preto branco e roxo (Tailwind) | Conexão OpenAI **ou** Together AI / Ollama |
| Markdown + embeds YouTube | Cache em memória para reduzir requisições |
| PWA ready | Tratamento de erros e fallback offline |

---

## 📂 Estrutura

```
apps/
 ├─ frontend/          # Vite + React
 │   ├─ src/
 │   │   ├─ App.jsx
 │   │   ├─ Message.jsx
 │   │   └─ ...
 │   ├─ public/
 │   └─ vite.config.js
 └─ backend/           # Node + Express
     ├─ src/
     │   ├─ routes/
     │   │   ├─ chat.js
     │   │   └─ commands.js
     │   └─ services/
     │       ├─ openai.js
     │       └─ hltv.js
     └─ .env.example
```

---

## 🚀 Instalação rápida

```bash
git clone https://github.com/seu-usuario/pantera-chat.git
cd pantera-chat
```

### 1. Backend

```bash
cd apps/backend
cp .env.example .env          # coloque sua chave OPENAI ou TOGETHER
npm install
npm run dev                   # http://localhost:5000
```

### 2. Frontend

```bash
cd ../frontend
npm install
npm run dev                   # http://localhost:5173
```

O Vite já proxia `/chat` para `http://localhost:5000`.

---

## 🔑 Configuração de API

### OpenAI  
```
OPENAI_API_KEY=sk-...
# opcional se usa organização diferente:
# OPENAI_ORG_ID=org_abc123
```

### Together AI (plano gratuito 1 M tokens/mês)  
```
TOGETHER_API_KEY=tok-...
```

### Ollama local (sem chave)  
Edite `services/openai.js` para usar endpoint `http://localhost:11434/api/chat`.

---

## 🛠️ Scripts úteis

| Local | Comando | Descrição |
|-------|---------|-----------|
| frontend | `npm run dev` | Vite + hot reload |
| frontend | `npm run build` | Build produção |
| backend | `npm run dev` | Nodemon (auto‑restart) |
| backend | `npm start` | Node sem nodemon |

---

## ⚙️ Comandos do chat

- `/proximo` → mostra próximo jogo da FURIA.  
- `/stats kscerato` → stats resumidos do jogador.  
- Pergunte livremente → resposta via IA (se quota disponível).  

---

## 🧩 Roadmap

- [ ] Quiz diário & leaderboard  
- [ ] Reações em tempo real (Socket.io)  
- [ ] Notificações push para mapas vencidos  
- [ ] Loja oficial com cupons  

Contribuições são bem‑vindas! Abra uma *issue* ou *pull request*.

---

## 📄 Licença

MIT © 2025 — você, a comunidade FURIA e todos que ajudarem.  

> “Go FURIA!” 🐆
