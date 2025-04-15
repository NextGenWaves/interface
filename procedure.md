# 🚀 Guide de Fork de l'Interface Uniswap (UC Wallet)

Ce guide t'explique comment forker l'interface officielle d'Uniswap pour y intégrer ta propre smart wallet (UC Wallet), étape par étape.

---

## ✅ 1. Cloner le dépôt

```bash
git clone https://github.com/Uniswap/interface.git
cd interface
```

---

## 🧩 2. Configuration initiale

### Crée le fichier `.env.defaults` à la racine du repo :

```bash
touch .env.defaults
```

### Puis copie-colle ce contenu :

```env
# === Providers & RPC Keys ===
ALCHEMY_API_KEY=demo
INFURA_KEY=demo
OPENAI_API_KEY=fake-openai-key
QUICKNODE_ENDPOINT_NAME=fake-qn-name
QUICKNODE_ENDPOINT_TOKEN=fake-qn-token
WALLETCONNECT_PROJECT_ID=wc-demo
WALLETCONNECT_PROJECT_ID_BETA=wc-beta
WALLETCONNECT_PROJECT_ID_DEV=wc-dev

# === API URLs (disabled to prevent fetch errors)
API_BASE_URL_OVERRIDE=
API_BASE_URL_V2_OVERRIDE=
FOR_API_URL_OVERRIDE=
GRAPHQL_URL_OVERRIDE=
SCANTASTIC_API_URL_OVERRIDE=
SIMPLEHASH_API_URL=
STATSIG_PROXY_URL_OVERRIDE=
TRADING_API_URL_OVERRIDE=
UNITAGS_API_URL_OVERRIDE=

# === Feature Flags
INCLUDE_PROTOTYPE_FEATURES=true

# === External Services Keys (mocked or disabled)
APPSFLYER_API_KEY=fake-appsflyer-key
APPSFLYER_APP_ID=com.ucwallet.app
DATADOG_CLIENT_TOKEN=dd-fake-token
DATADOG_PROJECT_ID=ucwallet-dev
ONESIGNAL_APP_ID=fake-onesignal-id
SENTRY_DSN=fake-sentry-dsn
SIMPLEHASH_API_KEY=fake-simplehash-key
STATSIG_API_KEY=fake-statsig-key
TRADING_API_KEY=fake-trading-key
UNISWAP_API_KEY=fake-uniswap-key
AMPLITUDE_PROXY_URL_OVERRIDE=

# === Fork Dev Server
PORT=3001

```

---

## 📦 3. Installer les dépendances

```bash
yarn install
```

---

## 🛠️ 4. Corriger les chemins manquants

Certains fichiers générés manquent.

### Crée manuellement les dossiers :

```bash
mkdir -p packages/uniswap/src/data/graphql/uniswap-data-api/__generated__
mkdir -p packages/uniswap/src/data/tradingApi/__generated__
```

---

## ⚙️ 5. Générer les fichiers internes

```bash
yarn g:prepare
```

a la racine

> Cela va générer automatiquement les fichiers `types-and-hooks`, `tradingApi`, `contracts`, etc.

---

## 🧱 6. Build des packages nécessaires

```bash
cd packages/ui
yarn build
```

---

## ▶️ 7. Lancer l'interface en local

```bash
yarn start
```

> Par défaut, l'interface est dispo sur http://localhost:3001

---

## 🧠 8. Astuce : Activer la détection de ta UC Wallet

Dans ton script injecté, assure-toi d'injecter ceci :

```ts
(window as any).ethereum = {
  isUCWallet: true,
  isMetaMask: true, // pour être détecté automatiquement
  request: async ({ method, params }) => { ... },
  on: () => {},
  removeListener: () => {},
}
```

---

## ✅ Tu es prêt !
