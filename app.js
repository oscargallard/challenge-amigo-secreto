let amigos = [];

const inputAmigos = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const listaResultados = document.getElementById("resultado");

function agregarAmigo() {
    const nombre = inputAmigos.value.trim();
    if (nombre === "") {
        mostrarError("Por favor, inserte un nombre.");
        return;
    }

    if (!amigos.includes(nombre)) {
        amigos.push(nombre);
        actualizarLista();
    } else {
        mostrarError("Este nombre ya ha sido agregado.");
    }

    inputAmigos.value = "";
}

function actualizarLista() {
    listaAmigos.innerHTML = amigos.map(nombre => `<li>${nombre}</li>`).join("");
}

function mostrarError(mensaje) {
    const errorElement = document.createElement("p");
    errorElement.textContent = mensaje;
    errorElement.style.color = "red";
    inputAmigos.parentNode.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 3000); // Eliminar el mensaje después de 3 segundos
}

function sortearAmigo() {
    listaResultados.innerHTML = "";

    if (amigos.length === 0) {
        mostrarError("No hay amigos para sortear!");
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