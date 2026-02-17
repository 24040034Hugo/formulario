document.getElementById('btnCalcular').addEventListener('click', () => {
    // 1. Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const unidad1 = document.getElementById('unidad1').value;
    const unidad2 = document.getElementById('unidad2').value;
    const unidad3 = document.getElementById('unidad3').value;

    // 2. Valida que los campos tengan información
    if (!nombre || !unidad1 || !unidad2 || !unidad3) {
        alert('Por favor completa todos los campos');
        return;
    }

    // 3. La funcion fetch hace las peticiones al servidor
    // 4. /calcular-promedio es la ruta a donde se envían
    fetch('/calcular-promedio', {
        method: 'POST', // 5. Vamos a enviar datos
        headers: { 'Content-Type': 'application/json' }, // 6. Enviamos JSON
        body: JSON.stringify({ // 7. Datos convertidos a texto JSON
            nombre,
            unidad1,
            unidad2,
            unidad3
        })
    })
    .then(res => res.json())
    .then(data => {
        // Insertar resultados en los inputs correspondientes
        document.getElementById('promedio').value = data.promedio.toFixed(2);
        document.getElementById('estatus').value = data.estatus;

        // Feedback visual: color verde si aprueba, rojo si reprueba
        const estatusField = document.getElementById('estatus');
        if (data.estatus === "Aprobado") {
            estatusField.style.color = "#27ae60";
            estatusField.style.fontWeight = "bold";
        } else {
            estatusField.style.color = "#c0392b";
            estatusField.style.fontWeight = "bold";
        }
    })
    .catch(err => {
        console.error("Error en la petición:", err);
        alert("Error al conectar con el servidor");
    });
});

// Función para limpiar las cajas del formulario (puedes llamarla si agregas un botón extra)
function limpiarFormulario() {
    document.getElementById('nombre').value = "";
    document.getElementById('unidad1').value = "";
    document.getElementById('unidad2').value = "";
    document.getElementById('unidad3').value = "";
    document.getElementById('promedio').value = "";
    document.getElementById('estatus').value = "";
}