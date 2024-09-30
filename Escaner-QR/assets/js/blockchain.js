class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "0", Date.now(), "Bloque Génesis", this.calculateHash(0, "0", Date.now(), "Bloque Génesis"));
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const previousBlock = this.getLatestBlock();
        const index = previousBlock.index + 1;
        const timestamp = Date.now();
        const hash = this.calculateHash(index, previousBlock.hash, timestamp, data);
        const newBlock = new Block(index, previousBlock.hash, timestamp, data, hash);
        this.chain.push(newBlock);
    }

    calculateHash(index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }

    printChain() {
        const blockchainDiv = document.getElementById('blockchain');
        blockchainDiv.innerHTML = JSON.stringify(this.chain, null, 4);
    }
}

// Instanciar la blockchain
const myBlockchain = new Blockchain();
myBlockchain.addBlock("Primer bloque de datos");
myBlockchain.addBlock("Segundo bloque de datos");
myBlockchain.printChain();

// Funciones para manejar la cámara
function startCamera() {
    // Aquí iría la lógica para encender la cámara y escanear el código QR
    console.log("Cámara encendida");
}

function stopCamera() {
    // Aquí iría la lógica para detener la cámara
    console.log("Cámara detenida");
}