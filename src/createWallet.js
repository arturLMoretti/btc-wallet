const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// define network
// const network = bitcoin.networks.bitcoin;
const network = bitcoin.networks.testnet;

// derivação de carteira a partir de uma seed
const path = "m/49'/1'/0'/0";

// gera uma seed aleatória e mnemônica
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// cria a raiz da carteira
const root = bip32.fromSeed(seed, network);

// criar conta
const account = root.derivePath(path);
const node = account.derive(0).derive(0);

// criar endereço
const btcAddress = bitcoin.payments.p2pkh({ pubkey: account.publicKey, network });

console.log('Carteira gerada')
console.log('Mnemonic: ', mnemonic);
console.log('Seed: ', seed.toString('hex'));
console.log('Endereço: ', btcAddress);
console.log('Chave privada: ', node.toWIF());