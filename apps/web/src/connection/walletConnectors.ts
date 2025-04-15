import { ucwalletConnector } from 'src/connection/ucwalletConnector'

export const CONNECTION_PROVIDER_IDS = {
  UC_WALLET: 'com.ucwallet.injected',
} as const

export const walletConnectors = {
  [CONNECTION_PROVIDER_IDS.UC_WALLET]: ucwalletConnector,
}
