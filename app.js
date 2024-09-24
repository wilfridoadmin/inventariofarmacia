let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Selección de elementos del DOM
const formAgregar = document.getElementById('form-agregar');
const listaProductos = document.getElementById('lista-productos');

// Función para guardar el inventario en localStorage
function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para agregar productos
formAgregar.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturamos los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const concentracion = document.getElementById('concentracion').value;
    const LOTE = document.getElementById('LOTE').value;
    const laboratorio = document.getElementById('laboratorio').value;
    const invima = document.getElementById('invima').value;
    const forma = document.getElementById('forma').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // Crear objeto producto
    const producto = {
        nombre,
        concentracion,
        laboratorio,
        invima,
        forma,
        vencimiento,
        cantidad
    };

    // Agregar producto al inventario
    inventario.push(producto);

    // Guardar inventario en localStorage
    guardarInventario();

    // Limpiar el formulario
    formAgregar.reset();

    // Actualizar la tabla del inventario
    actualizarInventario();
});

// Función para actualizar la tabla de inventario
function actualizarInventario() {
    // Limpiar la lista actual
    listaProductos.innerHTML = '';

    // Recorrer el inventario y agregar cada producto a la tabla
    inventario.forEach((producto, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.concentracion}</td>
            <td>${producto.laboratorio}</td>
            <td>${producto.invima}</td>
            <td>${producto.forma}</td>
            <td>${producto.vencimiento}</td>
            <td>${producto.cantidad}</td>
            <td><button class="eliminar" data-index="${index}">Eliminar</button></td>
        `;

        // Añadir la fila a la tabla
        listaProductos.appendChild(fila);
    });

    // Asignar evento a los botones "Eliminar"
    document.querySelectorAll('.eliminar').forEach(boton => {
        boton.addEventListener('click', eliminarProducto);
    });
}

// Función para eliminar un producto del inventario
function eliminarProducto(event) {
    const index = event.target.dataset.index;

    // Eliminar producto del inventario
    inventario.splice(index, 1);

    // Guardar cambios en localStorage
    guardarInventario();

    // Actualizar la tabla
    actualizarInventario();
}

// Inicializar la tabla de inventario al cargar la página
actualizarInventario();
