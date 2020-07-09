const express = require('express');
const Datastore = require('nedb')
const app = express();
app.listen(3000,() => console.log('Conectado a porta 3000'));

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

app.listen(process.env.PORT || 5000);
console.log('Aplicação Rodando');