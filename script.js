function goTo(page) {
    if (page === 'ball') {
        window.location.href = 'bola.html';
    } else if (page === 'hangman') {
        window.location.href = 'ahorcado.html';
    } else if (page === 'trivia') {
        window.location.href = 'trivia.html';
    } else if (page === 'results') {
        window.location.href = 'resultados.html'; // Redirige a Resultados
    } else if (page === 'dado') {
        window.location.href = 'dado.html'; // Redirige a Dado
    }
}