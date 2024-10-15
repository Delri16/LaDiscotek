const express = require('express');
const app = express();
const port = 3000;

// Ruta para la raíz "/"
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente en /');
});

// Ruta para OAuth2 callback "/callback"
app.get('/callback', (req, res) => {
    res.send('OAuth2 callback received');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
