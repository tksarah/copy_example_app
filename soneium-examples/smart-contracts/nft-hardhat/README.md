# Sample NFT Smart-Contract Project

This project demonstrates a basic Hardhat use case with a sample NFT contract, a test for that contract, and a Hardhat Ignition module configured to deploy the contract on Soneium Minato.

## Install Packages

```bash
pnpm i
```

## Set the Private Key for Deployer

Use Hardhat’s configuration variables manager to set the private key:

```bash
npx hardhat vars set PRIVATE_KEY
```

## Compile the Contract

```bash
npx hardhat compile
```

## Test the Contract

Deploy the contract on the local Hardhat network before testing:

```bash
npx hardhat ignition deploy ./ignition/modules/NFT.ts --network hardhat
npx hardhat test ./test/NFT.ts --network hardhat
```

## Deploy the Contract

Due to inconsistencies in the deployed environments (e.g., inconsistencies with the deployer account), you might need to manually delete the `ignition/deployments` folder before deploying contract.

```bash
npx hardhat ignition deploy ./ignition/modules/NFT.ts
```

## Verify the Contract

```bash
npx hardhat verify [CONTRACT_ADDRESS] [DEPLOYER_ADDRESS]
```

## Disclaimer

THIS SOFTWARE IS PROVIDED ON AN “AS IS WHERE IS” BASIS WITHOUT ANY REPRESENTATION OR WARRANTY, OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. WE MAKE NO REPRESENTATION, WARRANTY, UNDERTAKING, GUARANTEE OR ASSURANCE WITH RESPECT TO THIS SOFTWARE, INCLUDING BUT NOT LIMITED THAT IT IS SECURE, OR ERROR-FREE, OR FREE OF VULNERABILITIES OR VIRUSES OR BUGS.
YOUR USE OF THE SOFTWARE IS AT YOUR SOLE RISK. YOU SHOULD CONDUCT YOUR OWN INDEPENDENT DUE DILIGENCE AND COMPLY WITH ALL APPLICABLE LAWS. WE ARE NOT RESPONSIBLE FOR ANY LOSSES OR DAMAGES WHATSOEVER THAT YOU SUFFER OR INCUR FROM USING THE SOFTWARE.
