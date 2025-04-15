import { getAddress } from 'viem'
import { createConnector } from 'wagmi'

export const ucwalletConnector = createConnector((config) => {
  return {
    id: 'com.ucwallet.injected',
    name: 'UC Wallet',
    icon: '/images/logos/ucwallet-icon.png', // Assure-toi que le fichier existe
    type: 'injected',
    supportsSimulation: false,

    async setup() {},

    async connect() {
      if (typeof window === 'undefined' || typeof window.ethereum !== 'object' || !window.ethereum.isUCWallet) {
        throw new Error('UC Wallet non détectée')
      }

      const provider = window.ethereum
      const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as string[]
      const chainIdHex = (await provider.request({ method: 'eth_chainId' })) as string

      return {
        accounts: accounts.map(getAddress) as readonly `0x${string}`[],
        chainId: parseInt(chainIdHex, 16),
      }
    },

    async disconnect() {},

    async getAccounts() {
      const provider = window.ethereum
      if (!provider) return []

      const accounts = (await provider.request({ method: 'eth_accounts' })) as string[]
      return accounts.map(getAddress) as readonly `0x${string}`[]
    },

    async getChainId() {
      const provider = window.ethereum
      if (!provider) {
        throw new Error('Provider UC Wallet non disponible')
      }
      const chainIdHex = (await provider.request({ method: 'eth_chainId' })) as string
      return parseInt(chainIdHex, 16)
    },

    async getProvider() {
      if (typeof window === 'undefined' || typeof window.ethereum !== 'object' || !window.ethereum.isUCWallet) {
        return undefined
      }
      return window.ethereum
    },

    async isAuthorized() {
      const accounts = await this.getAccounts()
      return accounts.length > 0
    },

    onAccountsChanged(accounts: string[]) {
      config.emitter.emit('change', {
        accounts: accounts.map(getAddress) as readonly `0x${string}`[],
      })
    },

    onChainChanged(chainId: string | number) {
      const id = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId
      config.emitter.emit('change', { chainId: id })
    },

    onDisconnect() {
      config.emitter.emit('disconnect')
    },
  }
})
