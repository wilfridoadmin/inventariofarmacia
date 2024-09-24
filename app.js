document.addEventListener('DOMContentLoaded', function() {
    let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

    // Selección de elementos del DOM
    const formAgregar = document.getElementById('form-agregar');
    const listaProductos = document.getElementById('lista-productos');

    if (!formAgregar || !listaProductos) {
        console.error('No se encontraron los elementos del DOM necesarios.');
        return;
    }

    // Función para guardar el inventario en localStorage
    function guardarInventario() {
        localStorage.setItem('inventario', JSON.stringify(inventario));
    }

    // Función para agregar productos
    formAgregar.addEventListener('submit', function(event) {
        event.preventDefault();

        // Depuración
        console.log('Elemento nombre:', document.getElementById('nombre'));
        console.log('Elemento concentracion:', document.getElementById('concentracion'));
        console.log('Elemento lote:', document.getElementById('lote'));
        console.log('Elemento laboratorio:', document.getElementById('laboratorio'));
        console.log('Elemento invima:', document.getElementById('invima'));
        console.log('Elemento forma:', document.getElementById('forma'));
        console.log('Elemento vencimiento:', document.getElementById('vencimiento'));
        console.log('Elemento cantidad:', document.getElementById('cantidad'));

        const nombre = document.getElementById('nombre').value.trim();
        const concentracion = document.getElementById('concentracion').value.trim();
        const lote = document.getElementById('lote').value.trim(); // Usar 'lote'
        const laboratorio = document.getElementById('laboratorio').value.trim();
        const invima = document.getElementById('invima').value.trim();
        const forma = document.getElementById('forma').value.trim();
        const vencimiento = document.getElementById('vencimiento').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);

        // Validar que todos los campos son llenados correctamente
        if (!nombre || !concentracion || !lote || !laboratorio || !invima || !forma || !vencimiento || isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        // Crear objeto producto
        const producto = { nombre, concentracion, lote, laboratorio, invima, forma, vencimiento, cantidad };

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

            fila.innerHTML = 
                `<td>${producto.nombre}</td>
                <td>${producto.concentracion}</td>
                <td>${producto.lote}</td>
                <td>${producto.laboratorio}</td>
                <td>${producto.invima}</td>
                <td>${producto.forma}</td>
                <td>${producto.vencimiento}</td>
                <td>${producto.cantidad}</td>
                <td><button class="eliminar" data-index="${index}">Eliminar</button></td>`;

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
});
