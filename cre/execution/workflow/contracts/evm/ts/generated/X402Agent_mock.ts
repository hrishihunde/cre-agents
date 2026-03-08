// Code generated — DO NOT EDIT.
import type { Address } from 'viem'
import { addContractMock, type ContractMock, type EvmMock } from '@chainlink/cre-sdk/test'

import { X402AgentABI } from './X402Agent'

export type X402AgentMock = {
} & Pick<ContractMock<typeof X402AgentABI>, 'writeReport'>

export function newX402AgentMock(address: Address, evmMock: EvmMock): X402AgentMock {
  return addContractMock(evmMock, { address, abi: X402AgentABI }) as X402AgentMock
}

