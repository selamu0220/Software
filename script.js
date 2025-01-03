let points = 0; // Puntos iniciales

// Función para generar las filas
function createRows(start, end) {
    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de insertar nuevas filas
    for (let i = start; i <= end; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td class="closed">
                <span><input type="text" class="input-field" placeholder="Nombre del Cliente" value="Cliente ${i}" /></span>
            </td>
            <td>
                <input type="text" class="input-field" placeholder="@usuario" value="usuario${i}" />
            </td>
            <td>
                <div class="calendar-wrapper">
                    <input type="text" readonly onclick="toggleCalendar(${i})" id="calendar-input-${i}" placeholder="Seleccionar fecha" />
                    <div id="calendar-${i}" class="calendar">
                        <input type="date" onchange="updateDate(this, ${i})" />
                        <button onclick="closeCalendar(${i})">Cerrar</button>
                    </div>
                </div>
            </td>
            <td>
                <select class="input-field">
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
            </td>
            <td>
                <select class="input-field" onchange="updateClientStatus(this, ${i})">
                    <option value="none">Seleccionar</option>
                    <option value="close">Cerrar Cliente</option>
                    <option value="lose">Perder Cliente</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Función para actualizar la fecha
function updateDate(input, id) {
    const date = new Date(input.value);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    document.getElementById(`calendar-input-${id}`).value = `${month} ${year}`;
    closeCalendar(id);
}

// Función para mostrar el calendario
function toggleCalendar(id) {
    const calendar = document.getElementById(`calendar-${id}`);
    calendar.classList.toggle('open');
}

// Función para cerrar el calendario
function closeCalendar(id) {
    const calendar = document.getElementById(`calendar-${id}`);
    calendar.classList.remove('open');
}

// Función para actualizar el estado del cliente y sumar/restar puntos
function updateClientStatus(select, id) {
    const status = select.value;
    const row = select.closest('tr'); // Seleccionamos la fila del cliente
    const nameCell = row.querySelector('.closed span');
    const usernameCell = row.querySelector('td:nth-child(3)');

    // Si el cliente se cierra
    if (status === 'close') {
        points += 100; // Sumar puntos al cerrar cliente
        document.getElementById("points").textContent = points;

        // Aplicar tachado a todo el contenido de la fila
        nameCell.classList.add('strike-through');
        usernameCell.classList.add('strike-through');
    }

    // Si el cliente se pierde, restar puntos
    if (status === 'lose') {
        points -= 100; // Restar puntos si el cliente se pierde
        if (points < 0) points = 0; // Evitar puntos negativos
        document.getElementById("points").textContent = points;

        // Aplicar tachado a todo el contenido de la fila
        nameCell.classList.add('strike-through');
        usernameCell.classList.add('strike-through');
    }

    // Si el cliente está en "Seleccionar", no hacer nada con los puntos
    if (status === 'none') {
        return; // No hacer nada si la opción es "Seleccionar"
    }
}

// Paginación y control de filas
let currentPage = 1;
const rowsPerPage = 5;

function goToPage(page) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    createRows(start, end);
}

// Inicializamos la primera página
createRows(1, rowsPerPage);

// Control de la paginación
document.getElementById("prev-btn").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        goToPage(currentPage);
    }
});

document.getElementById("next-btn").addEventListener("click", function() {
    currentPage++;
    goToPage(currentPage);
});
