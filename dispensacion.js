let inventario = JSON.parse(localStorage.getItem('inventario')) || [];
let dispensaciones = JSON.parse(localStorage.getItem('dispensaciones')) || [];
let listadoFactura = [];

// Selección de elementos del DOM
const productoSeleccionado = document.getElementById('producto-seleccionado');
const cantidadDispensar = document.getElementById('cantidad-dispensar');
const listaFactura = document.getElementById('lista-factura');
const tipoDispensacion = document.getElementById('tipo-dispensacion');
const historialDispensacion = document.getElementById('historial-dispensacion');

// Cargar productos en el selector
function cargarProductos() {
    inventario.forEach((producto, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = `${producto.nombre} (${producto.cantidad} disponibles)`;
        productoSeleccionado.appendChild(option);
    });
}

// Agregar producto al listado de factura
document.getElementById('agregar-producto').addEventListener('click', function() {
    const indexProducto = productoSeleccionado.value;
    const cantidad = parseInt(cantidadDispensar.value);

    if (indexProducto !== '' && cantidad > 0 && inventario[indexProducto].cantidad >= cantidad) {
        const producto = inventario[indexProducto];
        listadoFactura.push({ producto, cantidad });

        // Mostrar el listado de la factura
        const li = document.createElement('li');
        li.innerText = `${producto.nombre} - ${cantidad} unidades`;
        listaFactura.appendChild(li);

        // Limpiar los campos
        productoSeleccionado.value = '';
        cantidadDispensar.value = '';
    } else {
        alert('Selecciona un producto válido o verifica la cantidad.');
    }
});

// Procesar la dispensación y actualizar inventario
document.getElementById('procesar-dispensacion').addEventListener('click', function() {
    const tipo = tipoDispensacion.value;
    const fecha = new Date().toLocaleString();

    listadoFactura.forEach(item => {
        const { producto, cantidad } = item;

        // Actualizar el stock del inventario
        const index = inventario.indexOf(producto);
        inventario[index].cantidad -= cantidad;

        // Registrar la dispensación
        dispensaciones.push({
            producto: producto.nombre,
            cantidad,
            tipo,
            fecha
        });

        // Agregar la dispensación al historial
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${cantidad}</td>
            <td>${tipo}</td>
            <td>${fecha}</td>
            <td>
                <button class="btn-eliminar" data-index="${dispensaciones.length - 1}">Eliminar</button>
                <button class="btn-imprimir" data-index="${dispensaciones.length - 1}">Imprimir</button>
            </td>
        `;
        historialDispensacion.appendChild(fila);
    });

    // Guardar los cambios en localStorage
    localStorage.setItem('inventario', JSON.stringify(inventario));
    localStorage.setItem('dispensaciones', JSON.stringify(dispensaciones));

    // Limpiar el listado de la factura
    listadoFactura = [];
    listaFactura.innerHTML = '';

    alert('Dispensación procesada exitosamente.');
});

// Cargar el historial de dispensaciones
function cargarHistorialDispensacion() {
    dispensaciones.forEach((dispensacion, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dispensacion.producto}</td>
            <td>${dispensacion.cantidad}</td>
            <td>${dispensacion.tipo}</td>
            <td>${dispensacion.fecha}</td>
            <td>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                <button class="btn-imprimir" data-index="${index}">Imprimir</button>
            </td>
        `;
        historialDispensacion.appendChild(fila);
    });
}

// Eliminar dispensación
document.getElementById('historial-dispensacion').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-eliminar')) {
        const index = event.target.getAttribute('data-index');

        // Obtener la dispensación que se eliminará
        const dispensacionEliminada = dispensaciones[index];

        // Actualizar el stock del inventario
        const indexProducto = inventario.findIndex(producto => producto.nombre === dispensacionEliminada.producto);
        inventario[indexProducto].cantidad += dispensacionEliminada.cantidad;

        // Eliminar del array
        dispensaciones.splice(index, 1);

        // Guardar cambios en localStorage
        localStorage.setItem('inventario', JSON.stringify(inventario));
        localStorage.setItem('dispensaciones', JSON.stringify(dispensaciones));

        // Recargar la página para actualizar el historial
        location.reload();
    }
});

// Imprimir dispensación
document.getElementById('historial-dispensacion').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-imprimir')) {
        const index = event.target.getAttribute('data-index');
        const dispensacion = dispensaciones[index];

        const printContent = `
            <html>
                <head>
                    <title>Imprimir Dispensa</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Detalles de la Dispensa</h1>
                    <table>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                        </tr>
                        <tr>
                            <td>${dispensacion.producto}</td>
                            <td>${dispensacion.cantidad}</td>
                            <td>${dispensacion.tipo}</td>
                            <td>${dispensacion.fecha}</td>
                        </tr>
                    </table>
                </body>
            </html>
        `;
        
        const win = window.open('', '', 'width=600,height=400');
        win.document.write(printContent);
        win.document.close();
        win.print();
    }
});

// Inicializar la página cargando los productos y el historial
cargarProductos();
cargarHistorialDispensacion();
