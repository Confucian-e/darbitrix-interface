import type { Account, Address } from "viem";

/**
 * Represents a contract with an address and a signer.
 */
export class BaseContract {
  contract: Address;
  signer: Account;

  /**
   * Creates a new instance of the Contract class.
   * @param contract The address of the contract.
   * @param signer The private key account used to sign transactions for the contract.
   */
  constructor(contract: Address, signer: Account) {
    this.contract = contract;
    this.signer = signer;
  }

  /**
   * Gets the address of the contract.
   * @returns The address of the contract.
   */
  getAddress(): Address {
    return this.contract;
  }

  /**
   * Gets the address of the signer.
   * @returns The address of the signer.
   */
  getSigner(): Address {
    return this.signer.address;
  }
}
