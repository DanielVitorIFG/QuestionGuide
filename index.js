const express = require('express');
const app = express();
const connection = require('./database/connection');

// database
connection
    .authenticate()
        .then(() => console.log('Conexão feita com o banco de dados'))
        .catch((error) => console.log(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // fazer o parsing das requisições que ele recebe.
app.use(express.json());

//  Rotas
app.get('/', (req,res) => {
    res.render('index'); 
});

app.get('/ask', (req,res) => {
    res.render('ask'); 
});

app.post('/saveQuestion', (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    res.send("Formulário recebido: " + "Título: "+ title + "Descrição: " + description);
});


app.listen(8080, () => console.log('Software rodando'));