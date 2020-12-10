import { BigInt } from "@graphprotocol/graph-ts"
import {
  DxToken,
  Pause,
  Unpause,
  OwnershipRenounced,
  OwnershipTransferred,
  Approval,
  Transfer
} from "../generated/DxToken/DxToken"
import { Approval_, Transfer_, OwnershipRenounced_, 
  OwnershipTransferred_ } from "../generated/schema"

export function handlePause(event: Pause): void {}

export function handleUnpause(event: Unpause): void {}

export function handleOwnershipRenounced(event: OwnershipRenounced): void {
  let entity = OwnershipRenounced_.load(event.params.previousOwner.toHex())

  if (entity == null) {
    entity = new OwnershipRenounced_(event.params.previousOwner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.previousOwner = event.params.previousOwner
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = OwnershipTransferred_.load(event.params.previousOwner.toHex())

  if (entity == null) {
    entity = new OwnershipTransferred_(event.params.previousOwner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleApproval(event: Approval): void {
  let entity = Approval_.load(event.params.owner.toHex())

  if (entity == null) {
    entity = new Approval_(event.params.owner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = Transfer_.load(event.params.from.toHex())

  if (entity == null) {
    entity = new Transfer_(event.params.from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
