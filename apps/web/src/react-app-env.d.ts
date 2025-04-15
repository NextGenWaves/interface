/// <reference types="react-scripts" />

interface EthereumProvider {
  isMetaMask?: true
  isCoinbaseWallet?: true
  isBraveWallet?: true
  isRabby?: true
  isTrust?: true
  isLedgerConnect?: true
  isUCWallet?: boolean
  autoRefreshOnNetworkChange?: boolean
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
}

interface Window {
  GIT_COMMIT_HASH?: string
  ethereum?: EthereumProvider
}

declare module 'content-hash' {
  export function decode(x: string): string
  export function getCodec(x: string): string
}

declare module 'multihashes' {
  export function decode(buff: Uint8Array): {
    code: number
    name: string
    length: number
    digest: Uint8Array
  }

  export function toB58String(hash: Uint8Array): string
}

declare module '*.webm' {
  const src: string
  export default src
}

declare module '*.mov' {
  const src: string
  export default src
}
