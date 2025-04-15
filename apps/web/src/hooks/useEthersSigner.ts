import { Web3Provider } from '@ethersproject/providers'
import { useMemo } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { useConnectorClient } from 'wagmi'

function clientToSigner(client?: Client<Transport, Chain, Account>) {
  if (!client || !client.chain) {
    return undefined
  }

  const { chain, transport, account } = client
  const ensAddress = (chain as any)?.contracts?.ensRegistry?.address // facultatif
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress,
  }

  const provider = new Web3Provider(transport, network)
  return provider.getSigner(account.address)
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner() {
  const { data: client } = useConnectorClient()
  return useMemo(() => clientToSigner(client), [client])
}
