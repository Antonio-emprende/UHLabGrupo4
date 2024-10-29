let palabraAdivinar = ""; // La palabra a adivinar
let intentosRestantes = 6;
let letrasUsadas = [];
let palabraMostrar = [];
let preguntaActual = "";

const dibujoAhorcado = document.getElementById("dibujo-ahorcado");
const contexto = dibujoAhorcado.getContext("2d");

// Selecciona una pregunta y respuesta al azar
function seleccionarPregunta() {
    const seleccion = preguntas[Math.floor(Math.random() * preguntas.length)];
    palabraAdivinar = seleccion.respuestaCorrecta.toUpperCase(); // Asegura que sea en mayúsculas
    preguntaActual = seleccion.pregunta;
    palabraMostrar = Array(palabraAdivinar.length).fill("_");
}

// Inicializa el juego
function inicializarJuego() {
    seleccionarPregunta();
    mostrarPalabra();
    crearTeclado();
    actualizarIntentos();
    document.getElementById("pregunta").textContent = preguntaActual;
    dibujarAhorcadoCompleto();
}

// Muestra la palabra como guiones y la pregunta en pantalla
function mostrarPalabra() {
    document.getElementById("guiones-palabra").textContent = palabraMostrar.join(" ");
}

function actualizarIntentos() {
    document.getElementById("intentosRestantes").textContent = intentosRestantes;
}

// Crea el teclado virtual solo una vez
function crearTeclado() {
    const tecladoDiv = document.getElementById("teclado");
    tecladoDiv.innerHTML = ""; // Limpia los botones existentes

    for (let i = 65; i <= 90; i++) { // Letras de A a Z
        const letra = String.fromCharCode(i);
        const boton = document.createElement("button");
        boton.className = "boton-letra";
        boton.textContent = letra;
        boton.onclick = () => verificarLetra(letra);
        tecladoDiv.appendChild(boton);
    }
}

function verificarLetra(letra) {
    if (letrasUsadas.includes(letra) || intentosRestantes <= 0) return;

    letrasUsadas.push(letra);
    document.getElementById("letras").textContent = letrasUsadas.join(", ");

    if (palabraAdivinar.includes(letra)) {
        for (let i = 0; i < palabraAdivinar.length; i++) {
            if (palabraAdivinar[i] === letra) {
                palabraMostrar[i] = letra;
            }
        }
        mostrarPalabra();
        verificarVictoria();
    } else {
        intentosRestantes--;
        actualizarIntentos();
        quitarParteAhorcado();
        verificarDerrota();
    }
}

function verificarVictoria() {
    if (!palabraMostrar.includes("_")) {
        document.getElementById("mensaje").textContent = "¡Felicidades! Has ganado.";
    }
}

function verificarDerrota() {
    if (intentosRestantes === 0) {
        document.getElementById("mensaje").textContent = "Juego terminado. La palabra era: " + palabraAdivinar;
    }
}

function dibujarAhorcadoCompleto() {
    contexto.clearRect(0, 0, dibujoAhorcado.width, dibujoAhorcado.height);
    dibujarBase("white");
    dibujarPoste("white");
    dibujarBarra("white");
    dibujarCuerda("white");
    dibujarCabeza("white");
    dibujarCuerpo("white");
    dibujarBrazoIzquierdo("white");
    dibujarBrazoDerecho("white");
    dibujarPiernaIzquierda("white");
    dibujarPiernaDerecha("white");
}

function quitarParteAhorcado() {
    const partes = [
        dibujarPiernaDerecha,   
        dibujarPiernaIzquierda,
        dibujarBrazoDerecho,    
        dibujarBrazoIzquierdo,  
        dibujarCuerpo,          
        dibujarCabeza           
    ];
    const parteQuitar = partes[6 - intentosRestantes];
    parteQuitar("black"); // "Borra" la parte en negro
}

// Funciones para dibujar cada parte del ahorcado
function dibujarBase(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(10, 180);
    contexto.lineTo(190, 180);
    contexto.stroke();
}

function dibujarPoste(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(50, 180);
    contexto.lineTo(50, 20);
    contexto.stroke();
}

function dibujarBarra(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(50, 20);
    contexto.lineTo(150, 20);
    contexto.stroke();
}

function dibujarCuerda(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(150, 20);
    contexto.lineTo(150, 40);
    contexto.stroke();
}

function dibujarCabeza(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.arc(150, 60, 20, 0, Math.PI * 2);
    contexto.stroke();
}

function dibujarCuerpo(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(150, 80);
    contexto.lineTo(150, 130);
    contexto.stroke();
}

function dibujarBrazoIzquierdo(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(150, 90);
    contexto.lineTo(120, 110);
    contexto.stroke();
}

function dibujarBrazoDerecho(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(150, 90);
    contexto.lineTo(180, 110);
    contexto.stroke();
}

function dibujarPiernaIzquierda(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(150, 130);
    contexto.lineTo(120, 160);
    contexto.stroke();
}

function dibujarPiernaDerecha(color = "white") {
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(150, 130);
    contexto.lineTo(180, 160);
    contexto.stroke();
}

// Inicializar el juego al cargar la página
window.onload = inicializarJuego;