const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain'); // Importa tu clase Blockchain desde otro archivo

const app = express();
const port = 3000;

// Crear una instancia de la cadena de bloques
let honeyChain = new Blockchain();

// Configurar body-parser para manejar solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para obtener la cadena de bloques
app.get('/blocks', (req, res) => {
    res.json(honeyChain.chain);
});

// Ruta para agregar una nueva transacción
app.post('/transactions', (req, res) => {
    const { timestamp, productCode } = req.body;
    if (timestamp && productCode) {
        const newTransaction = new Transaction(timestamp, productCode);
        honeyChain.addTransaction(newTransaction);
        res.send('Transaction added successfully');
    } else {
        res.status(400).send('Invalid transaction data');
    }
});

// Ruta para minar un nuevo bloque
app.get('/mine', (req, res) => {
    honeyChain.addBlock(new Block(Date.now(), honeyChain.getLatestBlock().transactions));
    res.send('New block mined successfully');
});

// Servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
