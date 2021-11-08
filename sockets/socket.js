const {io} = require('../index');

// Mensajes de Socket : 
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => console.log('Cliente desconectado'));

    // Escucho de mi fronted y devuelvo un mensaje a mi fronted : 
    client.on('mensaje', payload => {
        console.log('Hola : ', payload['nombre']);

        io.emit('response', payload['nombre']);

    });
});