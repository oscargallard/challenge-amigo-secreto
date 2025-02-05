let amigos = [];

const inputAmigos = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const listaResultados = document.getElementById("resultado");

// Función para mostrar el modal de error
function mostrarError(mensaje) {
    const modal = document.getElementById("modal-error");
    const modalMensaje = document.getElementById("modal-mensaje");

    // Mostrar el mensaje en el modal
    modalMensaje.textContent = mensaje;

    // Mostrar el modal
    modal.style.display = "flex";

    // Cerrar el modal automáticamente después de 3 segundos
    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);
}

// Función para cerrar el modal manualmente
document.getElementById("cerrar-modal").addEventListener("click", () => {
    const modal = document.getElementById("modal-error");
    modal.style.display = "none";
});

function agregarAmigo() {
    const nombre = inputAmigos.value.trim(); // Para evitar nombres que solo difieran en espacios
    console.log(typeof nombre);
    console.log(nombre.length);
    

    // Verifica que el nombre no esté vacío ni tenga menos de 2 caracteres.
    if (nombre === "" || nombre.length < 2) {
        mostrarError("⚠️El nombre ingresado esta vacío o bien tiene menos de 2 caracteres.");
        return;
    }

    // Validar que el nombre no contenga caracteres especiales
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(nombre)) {
        mostrarError("❌El nombre NO debe contener caracteres especiales.");
        return;
    }
    
    // Normalizar el nombre (convertir a minúsculas) para ignorar mayúsculas/minúsculas
    const nombreNormalizado = nombre.toLowerCase();
    // Verificar si el nombre ya existe 
    const existeNombre = amigos.some(amigo => amigo.toLowerCase() === nombreNormalizado);

    if (!existeNombre) {
        amigos.push(nombre); // Agregar el nombre original (sin normalizar)
        actualizarLista();

        // Mostrar el ícono de confirmación
        const confirmacionIcono = document.getElementById("confirmacion-icono");
        confirmacionIcono.textContent = "✔️"; // Ícono de confirmación
        confirmacionIcono.style.display = "inline"; // Mostrar el ícono

        // Ocultar el ícono después de 3 segundos
        setTimeout(() => {
            confirmacionIcono.style.display = "none";
        }, 3000);
    } else {
        mostrarError("⚠️Este nombre ya ha sido agregado.");
    }

    inputAmigos.value = ""; // Limpiar el campo de entrada
}

function actualizarLista() {
    listaAmigos.innerHTML = amigos.map(nombre => `<li>${nombre}</li>`).join("");
}

function sortearAmigo() {
    listaResultados.innerHTML = "";

    if (amigos.length === 0) {
        mostrarError("❌No hay amigos para sortear!");
        return;
    }

    let indiceAmigoSorteado = Math.floor(Math.random() * amigos.length);
    let nombreSorteado = amigos[indiceAmigoSorteado];

    let li = document.createElement("li");
    li.textContent = nombreSorteado;
    listaResultados.appendChild(li);

    amigos.splice(indiceAmigoSorteado, 1);
    actualizarLista();
}

function reiniciar() {
    amigos = [];
    listaAmigos.innerHTML = "";
    listaResultados.innerHTML = "";
}