// Configuración de Web3
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Cambia la URL según tu proveedor

// Dirección del contrato y ABI
const contractAddress = 'DIRECCION_DEL_CONTRATO'; // Reemplaza con la dirección de tu contrato
const contractABI = [ /* ABI del contrato */ ]; // Reemplaza con el ABI de tu contrato
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Callback cuando termina de leer el código QR
qrcode.callback = async (respuesta) => {
    if (respuesta) {
        try {
            const accounts = await web3.eth.getAccounts();
            const datosAlmacenados = await contract.methods.retrieveData().call({ from: accounts[0] });

            // Compara los datos escaneados con los almacenados
            if (respuesta === datosAlmacenados) {
                Swal.fire('¡Coincidencia encontrada! Datos: ' + respuesta);
                activarSonido(); // Llama a tu función para activar el sonido
            } else {
                Swal.fire('No hay coincidencia. Datos escaneados: ' + respuesta + ', Datos almacenados: ' + datosAlmacenados);
            }

            // No almacenar los datos escaneados en la blockchain
            // Esto es lo que se eliminó

            cerrarCamara(); // Cierra la cámara después de procesar
        } catch (error) {
            if (error.message.includes("El código ya ha sido utilizado")) {
                Swal.fire('Código ya fue utilizado.'); // Mensaje específico para código ya utilizado
            } else {
                console.error("Error al procesar el escaneo:", error);
            }
        }
    }
};
