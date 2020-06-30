//require é uma opção do node para chamar o express
const express = require('express')
//requisição da template engine nunjucks
const nunjucks = require('nunjucks')
//requisição do arquivo de rotas
const routes = require("./routes")
//requisição para poder sobreescrever os dados 
const methodOverride = require('method-override')

//criar um servidor
const server = express()

//Configuração para funcionar o body da requisição formulario
server.use(express.urlencoded({extended: true}))
//configuração do express para arquivos estáticos, observando a pasta public
server.use(express.static('public'))
//configuração do methodoverride deve vir antes das rotas
server.use(methodOverride('_method')) 
//midware para utilização da routes
server.use(routes)


//configuração da templete engine
server.set( "view engine", "njk" )

nunjucks.configure( "src/app/views", {
    express:server,
    //retirar o padrão do nunjucks para não segurar codigos html nas variaveis
    autoescape: false,
    //retirar o cache para atualização
    noCache: true
})

//o Servidor fica escutando a porta, a função so funciona quando o listen rodar
server.listen(5000, function() {
    console.log("Server is running.")
})