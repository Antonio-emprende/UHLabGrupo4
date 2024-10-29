// Variables globales para el juego
let turno = 0; // Contador de turnos para manejar los grupos
let preguntasUsadas = []; // Lista de preguntas ya utilizadas para evitar repeticiones

// Función para iniciar el juego y mostrar el primer conjunto de tres bolitas
function iniciarJuego() {
    document.querySelector('button[onclick="iniciarJuego()"]').disabled = true;
    generarBolitas();
}

// Función para generar un conjunto de tres bolitas
function generarBolitas() {
    for (let grupo = 1; grupo <= 3; grupo++) {
        crearBolita(grupo);
    }
}

// Función para crear y animar una bolita
function crearBolita(grupo) {
    let bolita = document.createElement("div");
    bolita.classList.add("bolita", `grupo${grupo}`);
    bolita.textContent = `G${grupo}`;
    bolita.style.fontWeight = "bold";
    bolita.style.color = "white";

    // Posicionar la bolita según el grupo
    if (grupo === 1) bolita.style.left = "10%";
    else if (grupo === 2) bolita.style.left = "45%";
    else if (grupo === 3) bolita.style.left = "80%";

    bolita.onclick = function() {
        mostrarPregunta(grupo); // Muestra la pregunta correspondiente al grupo
        bolita.remove();         // Remueve la bolita después de hacer clic
        turno++;
        if (turno % 3 === 0 && turno < 6) generarBolitas();
        else if (turno >= 6) alert("El juego ha terminado.");
    };

    document.getElementById("area-juego").appendChild(bolita);

    let topPos = 0;
    let interval = setInterval(() => {
        if (topPos < 200) {
            topPos += 5;
            bolita.style.top = `${topPos}px`;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

// Función para mostrar una pregunta con botones de opción
function mostrarPregunta(grupo) {
    let preguntaActual;
    do {
        preguntaActual = preguntas[Math.floor(Math.random() * preguntas.length)];
    } while (preguntasUsadas.includes(preguntaActual) && preguntasUsadas.length < preguntas.length);

    preguntasUsadas.push(preguntaActual);

    const preguntaContainer = document.getElementById("pregunta-container");
    const preguntaTexto = document.getElementById("pregunta-texto");
    const opcionesDiv = document.getElementById("opciones");

    preguntaTexto.textContent = `Grupo ${grupo} - ${preguntaActual.pregunta}`;
    opcionesDiv.innerHTML = "";

    // Crear botón para cada opción de respuesta
    preguntaActual.opciones.forEach(opcion => {
        let boton = document.createElement("button");
        boton.textContent = opcion;
        
        // Establecer un atributo data en el botón que indique si es la respuesta correcta
        boton.setAttribute("data-correcto", opcion[0] === preguntaActual.respuestaCorrecta);
        
        boton.onclick = function() {
            verificarRespuesta(grupo, boton);
        };
        opcionesDiv.appendChild(boton);
    });

    preguntaContainer.style.display = "block";
}

// Función para verificar la respuesta y actualizar la puntuación
function verificarRespuesta(grupo, boton) {
    const esCorrecto = boton.getAttribute("data-correcto") === "true";

    if (esCorrecto) {
        alert("¡Correcto! Ganas 5 puntos.");
        actualizarPuntuacion(`grupo${grupo}`, "Bola", 5);
    } else {
        alert("Respuesta incorrecta. Intenta de nuevo.");
    }

    // Oculta el contenedor de la pregunta después de responder
    document.getElementById("pregunta-container").style.display = "none";
}

// Función para actualizar la puntuación y almacenar los puntos en localStorage
function actualizarPuntuacion(grupo, juego, puntos) {
    // Obtener los puntos actuales del grupo desde localStorage
    let puntuacionActual = parseInt(localStorage.getItem(grupo)) || 0;
    puntuacionActual += puntos;

    // Guardar la nueva puntuación en localStorage
    localStorage.setItem(grupo, puntuacionActual);

    console.log(`Puntuación actualizada para ${grupo} en ${juego}: ${puntuacionActual} puntos`);
}

// Función para volver al menú principal
function volverMenu() {
    window.location.href = "index.html";
}