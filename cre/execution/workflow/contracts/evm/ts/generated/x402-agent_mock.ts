// Code generated — DO NOT EDIT.
import type { Address } from 'viem'
import { addContractMock, type ContractMock, type EvmMock } from '@chainlink/cre-sdk/test'

import { X402-agentABI } from './X402-agent'

export type X402-agentMock = {
} & Pick<ContractMock<typeof X402-agentABI>, 'writeReport'>

export function newX402-agentMock(address: Address, evmMock: EvmMock): X402-agentMock {
  return addContractMock(evmMock, { address, abi: X402-agentABI }) as X402-agentMock
}

