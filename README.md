# 💍 Wedding Gift Planner

Un calcolatore intelligente e moderno per determinare il regalo di matrimonio ideale, basato su convenzioni sociali, legami affettivi e costi logistici.

Sviluppato con **React 19**, **TypeScript** e **Tailwind CSS**.

## ✨ Caratteristiche

- **Calcolo Dinamico**: Algoritmo basato su più fattori (tipo di ricevimento, ruolo, anzianità dell'amicizia).
- **Bilanciamento Trasferta**: Riduzione automatica e intelligente del regalo in base alle spese di viaggio e hotel sostenute dall'invitato.
- **Reciprocità Storica**: Possibilità di calcolare il regalo basandosi su quanto ricevuto dagli sposi in passato, aggiornato al valore attuale.
- **Design Moderno**: Interfaccia pulita, reattiva e accessibile, con feedback immediato sui calcoli.
- **Privacy-First**: Tutti i dati sono salvati esclusivamente nel `localStorage` del tuo browser.

## 🛠️ Stack Tecnologico

- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS (v4)
- **Icone**: Lucide React
- **Tooling**: [Biome.js](https://biomejs.dev/) (Linting, Formatting & Check)
- **Build Tool**: Vite 8

## 🚀 Sviluppo

Il progetto utilizza **Biome.js** al posto di ESLint e Prettier per una gestione del codice estremamente veloce e integrata.

### Comandi disponibili

```bash
# Installa le dipendenze
pnpm install

# Avvia il server di sviluppo
pnpm dev

# Esegue il controllo del codice (lint, format, check) con Biome
pnpm check

# Applica automaticamente le correzioni di Biome
pnpm format

# Esegue il build per la produzione
pnpm build
```

## 📂 Struttura del Progetto

Il codice è organizzato in modo modulare per facilitare la manutenzione:

- `src/components/`: Componenti UI divisi per responsabilità (Layout, Calculator).
- `src/hooks/`: Logica applicativa e calcoli (es. `useWeddingGift`).
- `src/constants/`: Dati statici e configurazioni delle relazioni.
- `src/types/`: Definizioni TypeScript condivise.

---

Sviluppato con ❤️ da [Maurizio Tolomeo](https://www.mauriziotolomeo.it)
