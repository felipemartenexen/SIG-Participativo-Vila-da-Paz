const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Iniciando Servidor em ${port}`);
});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const database = new Datastore('database.db')
database.loadDatabase()

app.post('/api',(request, response) =>{
    console.log('Peguei um request');
    var data = request.body;
    var timestamp = Date.now()
    data.timestamp = timestamp
    database.insert(data)  
    response.json({
        status: 'Deu certo',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.long,
        estrutura: data.nomeEstrutura,
        importancia: data.importancia,
        opiniao: data.opiniao
    })
});
