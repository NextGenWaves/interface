// apps/web/src/connection/walletConnectors.ts
import { Z_INDEX } from 'theme/zIndex'
import { isWebAndroid, isWebIOS } from 'utilities/src/platform'
import { createConnector } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

export const walletTypeToAmplitudeWalletType = (connectionType?: string) => {
  switch (connectionType) {
    case 'injected':
      return 'UC Wallet'
    case 'walletConnect':
    case 'uniswapWalletConnect':
      return 'Wallet Connect'
    case 'coinbaseWallet':
      return 'Coinbase Wallet'
    default:
      return connectionType ?? 'Network'
  }
}

if (!process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('REACT_APP_WALLET_CONNECT_PROJECT_ID must be defined')
}

const WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

export const WC_PARAMS = {
  projectId: WALLET_CONNECT_PROJECT_ID!,
  metadata: {
    name: 'Uniswap',
    description: 'Uniswap Interface',
    url: 'https://app.uniswap.org',
    icons: ['/images/logos/ucwallet-icon.png'], // ✅ icône UC Wallet
  },
  qrModalOptions: {
    themeVariables: {
      '--wcm-font-family': '"Inter custom", sans-serif',
      '--wcm-z-index': Z_INDEX.modal.toString(),
    },
  },
}

export function uniswapWalletConnect() {
  return createConnector((config) => {
    const wc = walletConnect({
      ...WC_PARAMS,
      showQrModal: false,
    })(config)

    config.emitter.on('message', ({ type, data }) => {
      if (type === 'display_uri') {
        const uniswapWalletUri = `https://uniswap.org/app/wc?uri=${data}`
        window.dispatchEvent(new MessageEvent('display_uniswap_uri', { data: uniswapWalletUri }))

        if (isWebIOS || isWebAndroid) {
          window.location.href = `uniswap://wc?uri=${encodeURIComponent(data as string)}`
        }
      }
    })

    return {
      ...wc,
      id: 'uniswapWalletConnect',
      type: 'uniswapWalletConnect',
      name: 'Uniswap Wallet',
      icon: '/images/logos/ucwallet-icon.png', // ✅ icon unifiée
    }
  })
}
