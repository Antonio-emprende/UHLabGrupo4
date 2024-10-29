// Variable de puntajes, inicializando desde localStorage si ya existe
let puntajes = JSON.parse(localStorage.getItem("puntajesTotales")) || { 1: 0, 2: 0, 3: 0 };
let preguntasUsadas = { 1: [], 2: [], 3: [] }; // Arreglo para almacenar preguntas ya utilizadas por grupo

// Función para generar una pregunta para el grupo
function generarPregunta(grupo) {
    if (preguntasUsadas[grupo].length >= 3) {
        alert("Ya has respondido las 3 preguntas de este grupo.");
        return;
    }

    let preguntaIndice;
    do {
        preguntaIndice = Math.floor(Math.random() * 3) + (grupo - 1) * 3;
    } while (preguntasUsadas[grupo].includes(preguntaIndice));

    preguntasUsadas[grupo].push(preguntaIndice);

    const preguntaActual = preguntas[preguntaIndice];
    if (!preguntaActual) {
        console.error("Pregunta no encontrada para el grupo:", grupo);
        return;
    }

    const contenedorPregunta = document.createElement("div");
    contenedorPregunta.className = "contenedor-pregunta";
    contenedorPregunta.innerHTML = `<p>${preguntaActual.pregunta}</p>`;

    preguntaActual.opciones.forEach(opcion => {
        const botonOpcion = document.createElement("button");
        botonOpcion.className = "opcion-btn";
        botonOpcion.textContent = opcion;

        botonOpcion.onclick = () => verificarRespuesta(opcion, preguntaActual.respuestaCorrecta, grupo, contenedorPregunta);
        contenedorPregunta.appendChild(botonOpcion);
    });

    const botonGenerar = document.querySelector(`#grupo${grupo} .generar-pregunta-btn`);
    botonGenerar.parentNode.insertBefore(contenedorPregunta, botonGenerar.nextSibling);
}

// Función para actualizar el puntaje de un grupo y guardarlo en localStorage
function actualizarPuntaje(grupo, puntos) {
    // Cargar puntajes existentes o inicializar si no existen
    const puntajesTotales = {
        grupo1: parseInt(localStorage.getItem("grupo1")) || 0,
        grupo2: parseInt(localStorage.getItem("grupo2")) || 0,
        grupo3: parseInt(localStorage.getItem("grupo3")) || 0,
    };

    // Agregar los puntos al grupo correspondiente
    puntajesTotales[`grupo${grupo}`] += puntos;

    // Guardar los puntajes actualizados en localStorage
    localStorage.setItem("grupo1", puntajesTotales.grupo1);
    localStorage.setItem("grupo2", puntajesTotales.grupo2);
    localStorage.setItem("grupo3", puntajesTotales.grupo3);
}

// Función para verificar la respuesta seleccionada y actualizar puntajes
function verificarRespuesta(opcionSeleccionada, respuestaCorrecta, grupo, contenedorPregunta) {
    if (opcionSeleccionada.startsWith(respuestaCorrecta)) {
        actualizarPuntaje(grupo, 5);  // Añadir 5 puntos por respuesta correcta
        alert("¡Respuesta correcta! +5 puntos");
    } else {
        alert("Respuesta incorrecta.");
    }

    actualizarPuntajePantalla(); // Actualizar puntaje visible en la interfaz
    contenedorPregunta.remove();  // Eliminar la pregunta respondida
}

// Función para actualizar el puntaje en pantalla y en localStorage
function actualizarPuntajePantalla() {
    document.getElementById("puntaje").textContent = `Puntaje: ${puntajes[1] + puntajes[2] + puntajes[3]}`;
    localStorage.setItem("puntajesTotales", JSON.stringify(puntajes));
}

// Cargar el puntaje al inicio
function cargarPuntaje() {
    const puntajeTotal = puntajes[1] + puntajes[2] + puntajes[3];
    document.getElementById("puntaje").textContent = `Puntaje: ${puntajeTotal}`;
}

cargarPuntaje(); // Ejecuta esta función al inicio para mostrar el puntaje acumulado