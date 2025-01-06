document.addEventListener('DOMContentLoaded', function () {
    // Cambios entre secciones
    document.querySelectorAll('button[data-section], button[data-next], button[data-prev]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const targetSection = e.target.dataset.section || e.target.dataset.next || e.target.dataset.prev;
            if (targetSection) {
                document.querySelectorAll('.section').forEach((section) => {
                    section.classList.remove('active');
                });
                document.getElementById(targetSection).classList.add('active');
            }
        });
    });

    // Lógica del juego con muñecos y sonidos
    let score = 0;
    let correctAnswer = 0;
    let currentOperation = '+';

    // Método de Gauss-Jordan (resolución de un sistema de ecuaciones 2x2)
    function gaussJordan() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 10) + 1;
        const e = Math.floor(Math.random() * 10) + 1;
        const f = Math.floor(Math.random() * 10) + 1;

        const exercise = `Resuelve el sistema de ecuaciones:\n${a}x + ${b}y = ${e}\n${c}x + ${d}y = ${f}`;
        const solution = [(e * d - b * f) / (a * d - b * c), (a * f - e * c) / (a * d - b * c)];
        
        return { exercise, solution };
    }

    // Método de sustitución (resolver el sistema de ecuaciones por sustitución)
    function sustitucion() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 10) + 1;
        const e = Math.floor(Math.random() * 10) + 1;
        const f = Math.floor(Math.random() * 10) + 1;

        const exercise = `Resuelve el sistema de ecuaciones por sustitución:\n${a}x + ${b}y = ${e}\n${c}x + ${d}y = ${f}`;
        const solution = [(e - b * f / d) / a, (f - c * e / a) / d];

        return { exercise, solution };
    }

    // Método de Gauss-Jordan con más variaciones
    function gaussJordanExtended() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 10) + 1;
        const e = Math.floor(Math.random() * 10) + 1;
        const f = Math.floor(Math.random() * 10) + 1;

        const exercise = `Resuelve el sistema de ecuaciones utilizando Gauss-Jordan:\n${a}x + ${b}y = ${e}\n${c}x + ${d}y = ${f}`;
        const solution = [(e * d - b * f) / (a * d - b * c), (a * f - e * c) / (a * d - b * c)];
        
        return { exercise, solution };
    }

    // Método de sustitución con más variaciones
    function sustitucionExtended() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 10) + 1;
        const e = Math.floor(Math.random() * 10) + 1;
        const f = Math.floor(Math.random() * 10) + 1;

        const exercise = `Resuelve el sistema de ecuaciones por sustitución:\n${a}x + ${b}y = ${e}\n${c}x + ${d}y = ${f}`;
        const solution = [(e - b * f / d) / a, (f - c * e / a) / d];
        
        return { exercise, solution };
    }

    // Cambiar el tipo de ejercicio para incluir métodos de Gauss-Jordan y sustitución
    function updateExerciseType() {
        const exerciseType = Math.random() < 0.5 ? "gaussJordan" : "sustitucion"; // Cambia entre Gauss-Jordan y sustitución
        let exercise, solution;

        // Agregar más variaciones de los métodos
        const extendedType = Math.random() < 0.5 ? "gaussJordanExtended" : "sustitucionExtended";

        if (exerciseType === "gaussJordan") {
            ({ exercise, solution } = gaussJordan());
        } else if (exerciseType === "gaussJordanExtended") {
            ({ exercise, solution } = gaussJordanExtended());
        } else if (exerciseType === "sustitucion") {
            ({ exercise, solution } = sustitucion());
        } else {
            ({ exercise, solution } = sustitucionExtended());
        }

        document.getElementById('exercise').textContent = exercise;
        correctAnswer = solution;  // Se guarda la solución correcta para comparar
    }

    // Generar un ejercicio matemático
    function generateExercise() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        let exerciseText;
        switch (currentOperation) {
            case '+':
                exerciseText = `${num1} + ${num2}`;
                correctAnswer = num1 + num2;
                break;
            case '-':
                exerciseText = `${num1} - ${num2}`;
                correctAnswer = num1 - num2;
                break;
            case '*':
                exerciseText = `${num1} * ${num2}`;
                correctAnswer = num1 * num2;
                break;
            case '/':
                const divisor = Math.max(1, num2); // Evitar división por cero
                exerciseText = `${num1} / ${divisor}`;
                correctAnswer = parseFloat((num1 / divisor).toFixed(2)); // Redondear a 2 decimales
                break;
            case '%':
                exerciseText = `${num1}% de ${num2}`;
                correctAnswer = parseFloat(((num1 / 100) * num2).toFixed(2)); // Cálculo del porcentaje
                break;
        }

        document.getElementById('exercise').textContent = exerciseText;
    }

    // Cambiar la operación matemática de forma aleatoria
    function updateOperation() {
        const operations = ['+', '-', '*', '/', '%'];
        currentOperation = operations[Math.floor(Math.random() * operations.length)];
        generateExercise();
    }

    // Inicializar el primer ejercicio
    generateExercise();

    // Cambiar el ejercicio cuando se responde correctamente
    updateExerciseType();

    // Verificar la respuesta del usuario
    document.getElementById('check-btn').addEventListener('click', () => {
        const userAnswer = parseFloat(document.getElementById('answer').value);
        const feedback = document.getElementById('feedback');
        const characterEmoji = document.getElementById('character-emoji');

        // Verificar si la respuesta es correcta
        if (Math.abs(userAnswer - correctAnswer) < 0.01) { // Acepta un margen de error pequeño
            feedback.textContent = '¡Correcto! 🎉';
            feedback.style.color = 'green';
            characterEmoji.textContent = '';
            score += 10;
            document.getElementById('score').textContent = score;
            updateExerciseType(); // Cambiar el ejercicio después de una respuesta correcta
            document.getElementById('answer').value = ''; // Limpiar el campo de entrada
        } else {
            feedback.textContent = 'Incorrecto. Inténtalo de nuevo.';
            feedback.style.color = 'red';
            characterEmoji.textContent = '😟';
        }
    });

    // Botón para cambiar la operación manualmente
    document.getElementById('change-operation').addEventListener('click', () => {
        updateOperation();
    });

    // Añadir la funcionalidad para los mensajes de contacto
    const form = document.getElementById('contact-form');
    const commentsList = document.getElementById('comments-list');

    // Función para cargar los mensajes guardados
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsList.innerHTML = ''; // Limpiar la lista actual
        comments.forEach((comment) => {
            const li = document.createElement('li');
            li.textContent = `${comment.name}: ${comment.message}`;
            commentsList.appendChild(li);
        });
    }

    // Función para guardar un nuevo mensaje
    function saveComment(name, message) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, message });
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    }

    // Evento de envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && message) {
            saveComment(name, message); // Guardar el mensaje
            form.reset(); // Limpiar el formulario
            alert('¡Mensaje enviado con éxito!');
        } else {
            alert('Por favor, llena todos los campos.');
        }
    });

    // Cargar mensajes al iniciar
    loadComments();
});

