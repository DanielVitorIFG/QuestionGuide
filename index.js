const express = require('express');
const app = express();
const connection = require('./database/connection');
const Question = require('./database/Question');

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
    Question.findAll({raw: true}).then((questions) => {
        res.render('index', {
            questions: questions
        }); 
    });
});

app.get('/ask', (req,res) => {
    res.render('ask'); 
});

app.post('/saveQuestion', (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/'); // voltando para o início
    })   
});


app.listen(8080, () => console.log('Software rodando'));