/* eslint-disable import/no-unused-modules */

// apps/web/src/connection/walletConnectors.ts

import { ucwalletConnector } from 'src/connection/ucwalletConnector'
import { CONNECTION_PROVIDER_IDS } from 'uniswap/src/constants/web3'

export const walletConnectors = {
  [CONNECTION_PROVIDER_IDS.UC_WALLET_CONNECTOR_ID]: ucwalletConnector,
}
