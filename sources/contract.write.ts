import { Address, contractAddress, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { SampleTactContract,Add,Subtract,Multiply, Divide } from "./output/sample_SampleTactContract";
import { mnemonicToPrivateKey } from "@ton/crypto";

const Sleep = (ms: number)=> {
    return new Promise(resolve=>setTimeout(resolve, ms))
}


(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // open wallet v4 (notice the correct wallet version here)
    const mnemonic = "usage coral seat love tobacco reflect control speed convince culture family type bean absent discover final aerobic peace ozone judge cook sibling pink laugh"; // your 24 secret words (replace ... with the rest of the words)
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    
    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);

    // open the contract address
    let init = await SampleTactContract.init();
    let contract_address = contractAddress(0, init);
    let contract = await SampleTactContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);

    // send message to contract
    // await contract_open.send(walletSender, { value: toNano("0.01") }, "increment");

    // contract_open.send(walletSender, {value: toNano("0.01")}, {
    //     $$type: 'Add', amount: 10n
    // } as Add);

    // contract_open.send(walletSender, {value: toNano("0.01")}, {
    //     $$type: 'Multiply', amount: 2n
    // } as Multiply);

    // contract_open.send(walletSender, {value: toNano("0.01")}, {
    //     $$type: 'Subtract', amount: 4n
    // } as Subtract);

    contract_open.send(walletSender, {value: toNano("0.01")}, {
        $$type: 'Divide', amount: 2n
    } as Divide);

    await Sleep(20000);
    console.log("incremented: Counter Value: " + (await contract_open.getValue()));

})();

