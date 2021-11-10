const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen')  );
bands.addBand( new Band('ACDC')  );
bands.addBand( new Band('Sliptnok')  );
bands.addBand( new Band('Metalica') ),
bands.addBand( new Band('Heroes del Silencio') ),
bands.addBand( new Band('Iron Maiden') ),
bands.addBand( new Band('MegaDeath') ),

// console.log( bands );

// Mensajes de Socket : 
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => console.log('Cliente desconectado'));

    // Escucho de mi fronted y devuelvo un mensaje a mi fronted : 
    client.on('mensaje', payload => {
        console.log('Hola : ', payload['from']);

        io.emit('response', payload['from']);
    });
    
    client.on('from-flutter', payload => {
        console.log('este mensaje proviene de flutter :', payload['name']);
        client.broadcast.emit('from-flutter2', payload);// el .broadcast emite a todos menos al que lo envio   
    });

    client.emit('active-bands', bands.getBands() );

    client.on('vote-band', payload => {
        //console.log('votos : ',payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
    } );

    client.on('add-Band', payload => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', payload => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands() );
    });

    // client.on('from-server', payload => {
    //     console.log('emito desde la web :', payload['name']);
    //     io.emit('from-server', payload);        
    // });
    
});