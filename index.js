const express = require('express');
const app = express();
const connection = require('./database/connection');
const Question = require('./database/Question');
const Answer = require('./database/Answer');

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
    Question.findAll({raw: true, order: [
        ['id','DESC'] // ASC -> Ordem crescente || DESC -> Ordem Decrescente
    ]}).then((questions) => {
        res.render('index', {
            questions: questions
        }); 
    });
});

app.get('/ask', (req,res) => {
    res.render('ask'); 
});

app.post('/saveQuestion', (req,res) => {
    let title = req.body.title;
    let description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/'); // voltando para o início
    })   
});

app.get('/question/:id', (req,res) => {
    let id  = req.params.id;
    Question.findOne({
        where: {id: id}
    }).then(question => {
        question != undefined ? res.render('question',{question:question}) : res.redirect('/');
    });
});



app.listen(8080, () => console.log('Software rodando'));