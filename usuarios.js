const usuarios = [
    { usuario: 'quimico', password: 'hans1', rol: 'admin' },
    { usuario: 'auxiliar', password: '221099', rol: 'inventario' },
    { usuario: 'practicante', password: '1234', rol: 'dispensacion' },
];

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (usuarioEncontrado) {
        alert(`Bienvenido, ${usuarioEncontrado.usuario}`);
        
        // Redireccionar según el rol
        switch (usuarioEncontrado.rol) {
            case 'admin':
                window.location.href = 'inventario.html'; // Admin puede acceder a inventario
                break;
            case 'inventario':
                window.location.href = 'inventario.html'; // Auxiliar puede acceder a inventario
                break;
            case 'dispensacion':
                window.location.href = 'dispensacion.html'; // Practicante solo a dispensación
                break;
            default:
                alert('Rol no reconocido');
                break;
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
