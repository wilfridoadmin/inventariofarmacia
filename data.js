// Inicializar inventario
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Guardar inventario en localStorage
function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Agregar producto
function agregarProducto(producto) {
    inventario.push(producto);
    guardarInventario();
    actualizarInventario();
}

// Editar producto
function editarProducto(index, nuevoProducto) {
    inventario[index] = nuevoProducto;
    guardarInventario();
    actualizarInventario();
}

// Eliminar producto
function eliminarProducto(index) {
    inventario.splice(index, 1);
    guardarInventario();
    actualizarInventario();
}

// Buscar producto por nombre
function buscarProducto(nombre) {
    return inventario.find(producto => producto.nombre === nombre);
}

// Actualizar stock al dispensar productos
function dispensarProducto(nombre, cantidad) {
    const producto = buscarProducto(nombre);
    if (producto) {
        producto.cantidad -= cantidad;
        if (producto.cantidad < 0) producto.cantidad = 0; // No permitir stock negativo
        guardarInventario();
        actualizarInventario();
    } else {
        alert("Producto no encontrado");
    }
}

// Función para verificar stock bajo
function verificarStockBajo() {
    inventario.forEach(producto => {
        if (producto.cantidad < 5) {
            alert(`El producto ${producto.nombre} tiene un stock bajo: ${producto.cantidad}`);
        }
    });
}
