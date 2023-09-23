const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para enviar el correo electrónico
app.post('/enviar-correo', (req, res) => {
    const { name, email, message } = req.body;

    // Configura el transporte de correo (debes proporcionar tus propios datos)
    const config = require('./config'); // Asegúrate de que la ruta sea correcta

    // ...
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });
    
    // ...
    

    // Configura el correo electrónico
    const mailOptions = {
        from: config.email,
        to: config.password,
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: message
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el mensaje.');
        } else {
            console.log('Mensaje enviado: ' + info.response);
            res.status(200).send('Mensaje enviado correctamente.');
        }
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
