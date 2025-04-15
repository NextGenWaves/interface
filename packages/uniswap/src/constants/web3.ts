export const CONNECTION_PROVIDER_IDS = {
  WALLET_CONNECT_CONNECTOR_ID: 'walletConnect',
  UNISWAP_WALLET_CONNECT_CONNECTOR_ID: 'uniswapWalletConnect',
  INJECTED_CONNECTOR_ID: 'com.ucwallet.injected', // 👈 remplacé ici !
  INJECTED_CONNECTOR_TYPE: 'injected',
  COINBASE_SDK_CONNECTOR_ID: 'coinbaseWalletSDK',
  COINBASE_RDNS: 'com.coinbase.wallet',
  METAMASK_RDNS: 'io.metamask',
  UNISWAP_EXTENSION_RDNS: 'org.uniswap.app',
  SAFE_CONNECTOR_ID: 'safe',
  EMBEDDED_WALLET_CONNECTOR_ID: 'embeddedUniswapWalletConnector',
  MOCK_CONNECTOR_ID: 'mock',

  // 👇 Clé explicite ajoutée pour clarté dans le code
  UC_WALLET_CONNECTOR_ID: 'com.ucwallet.injected',
} as const
