const express = require('express');
const app = express();

// Middleware para procesar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para procesar el cálculo
app.post('/calcular-promedio', (req, res) => {
    const { nombre, unidad1, unidad2, unidad3 } = req.body;

    // Convertir a números flotantes
    const u1 = parseFloat(unidad1);
    const u2 = parseFloat(unidad2);
    const u3 = parseFloat(unidad3);

    // Validación de seguridad
    if (isNaN(u1) || isNaN(u2) || isNaN(u3)) {
        return res.status(400).json({ error: "Calificaciones inválidas" });
    }

    // Lógica del promedio
    const promedio = (u1 + u2 + u3) / 3;
    const estatus = promedio >= 6 ? "Aprobado" : "Reprobado";

    // Enviar respuesta al cliente
    res.json({
        nombre,
        promedio: promedio,
        estatus
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});