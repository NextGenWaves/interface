// apps/web/src/components/Web3Provider/injectedWithFallback.ts

import { createConnector } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function injectedWithFallback() {
  return createConnector((config) => {
    const injectedConnector = injected()(config)

    return {
      ...injectedConnector,
      connect(...params) {
        if (!window.ethereum) {
          window.open('https://ucwallet.com/', '_blank')
        }
        return injectedConnector.connect(...params)
      },
      get icon() {
        return '/images/logos/ucwallet-icon.png'
      },

      get name() {
        return 'UC Wallet'
      },
    }
  })
}
