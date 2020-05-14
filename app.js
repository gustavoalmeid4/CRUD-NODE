const express = require ('express');
const app = express();
const bodyparser = require ('body-parser');
const path = require ('path');
const ejs = require('ejs');
const mysql = require('mysql');

var server = app.listen('3000',()=>{
    console.log('Servidor Express iniciado na porta %s', server.address().port);
});



app.set('view engine','ejs');
app.set('views ',path.join(__dirname,'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


const db = mysql.createConnection({

host:'localhost',
user:'root',
password:'',
database:'nodecadastro'

});

db.connect(function(err){

if(err){
        console.log(' Banco não conectado!')
}


})

app.get('/',function(req,res){
    
    let query = db.query("SELECT * FROM clientes",function(err,results){
    res.render('../views/index.ejs',{lista:results});

    })
    
    
});

app.get('/cadastro',function(req,res){
    
    res.render('../views/cadastro.ejs',{})
    res.status(err.status || 500).send('error');
    
});


app.post('/cadastro',function(req,res){   
    console.log("Cadastro realizado com sucesso!");
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let empresa = req.body.empresa;
    let enviar = req.body.enviar;    
    var conectou = db.query("INSERT INTO clientes (nome,sobrenome,empresa) VALUES (?,?,?)",[nome,sobrenome,empresa],function(err,results){});
    res.render('../views/cadastro.ejs',{})
})

