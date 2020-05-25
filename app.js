const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const mysql = require('mysql');
const ObjectId = require('mysql').ObjectID;

var server = app.listen('3000', () => {
    console.log('Servidor Express iniciado na porta %s', server.address().port);
});



app.set('view engine', 'ejs');
app.set('views ', path.join(__dirname, 'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodecadastro'

});

db.connect(function (err) {
    if (err) {
        console.log("Não foi possível conectar no banco!");
    }
})

app.get('/', function (req, res) {

    let query = db.query("SELECT * FROM clientes", function (err, results) {
        console.log(results);
        res.render('../views/index.ejs', { lista: results });

    })

});

app.post('/delete/:id', function (req, res) {
    var sql = "DELETE from clientes WHERE id = ?";
    var query = db.query(sql, req.params.id, function (err, results) {
        console.log("Deletado com sucesso!");
        console.log(results);
        res.redirect('/')
    });
});



app.get('/cadastro', function (req, res) {
    res.render('../views/cadastro.ejs', { user: {} })    
});

app.get('/editar/:id', function (req, res) {

    var sql = "SELECT * from clientes WHERE id = ?";
    var query = db.query(sql, req.params.id, function (err, results) {
         res.render('../views/cadastro.ejs', { user:results[0]});
    });


});

app.post('/editar/:id', function (req, res) {

    var sql = "UPDATE clientes SET midia=? , autor=?, data=? WHERE id = ?;";
    var params = [
        req.body.midia,
        req.body.autor,
        req.body.data,
        req.params.id,
    ];
    db.query(sql, params, 
        function (err, results) {
            res.redirect('/');
    });


});



app.post('/cadastro', function (req, res) {
    console.log("Cadastro realizado com sucesso!");
    let midia = req.body.midia;
    let autor = req.body.autor;
    let data = req.body.data;
    var conectou = db.query("INSERT INTO clientes (midia,autor,data) VALUES (?,?,?)", [midia, autor, data], function (err, results) { });
    res.render('../views/cadastro.ejs', {})
})

