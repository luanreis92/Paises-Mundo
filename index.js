const express = require('express');
// const = declarar uma variavel
// express = nome da variavel
// require('express') = instanciar a biblioteca do express
const app = express();
const fs = require('fs');
let paises;

fs.readFile('./json/data.json', (err, data) => {
    if (err) throw err;
    paises = JSON.parse(data);
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})

app.get('/paises', (req, res, next) => {
    let total = Object.keys(paises).length;
    // res.send(`Total de Paises: ${total}`);
    //criando um array / adicionando um item no array
    // let dados = [] 
    //dados.push(`{"total":${total}}`);
    //criando um objeto / adicionando itens no objeto
    let dados = new Object();
    dados["total"] = total;
    dados["continentes"] = 5;
    let nomes = [];
    for (let i in paises) {
       let inicio = (paises[i].img).indexOf('px-Flag');
       img = (paises[i].img).substr(0, inicio -2) + '300' +
             (paises[i].img).substr(inicio);
        nomes.push({"pais": paises[i].pais,
                    "continente": paises[i].continente,
                    "img": img
                    })
    }
    dados["paises"] = nomes;
    res.json(dados);
});


app.get('/paises/:id', (req, res, next) => {
    let codigo = req.params.id;
    let ddi = (paises[codigo].ddi).toString();
    //res.send((paises[codigo].ddi).toString());
    res.send(`${paises[codigo].ddi}`);

});

app.get('/teste/:id', (req, res, next) => {
    res.send(`Testando...${req.params.id}`);
});

app.get('/teste', (req, res, next) => {
    res.send(`Usando query string (${req.query.nome})`);
})

app.use((req, res, next) => {
    pagina = `
    <!doctype html>
    <html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  </head>
  <body>
    <h4><strong>Para usar esta api utilize estas rotas</strong></h4>
    <p>Para mostrar todos os paises</p>
    <p><a href="http://localhost:3000/paises">http://localhost:3000/paises</a></p>
    <p>&nbsp</p>
    <p>Para mostrar as informa&ccedil;&otilde;es de um pais</p>
    <p><a href="http://localhost:3000/paises">http://localhost:3000/paises/1</a></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    </body>
    </html>`;
    res.send(pagina);
    next();
})

app.listen(3000, () => {
    console.log('Servidor "no" ar!!!')
})

