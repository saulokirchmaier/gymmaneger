const express = require('express')
//variavel responsável pelas rotas
const routes = express.Router()
// chamar o arquivo de criação update e delete instructors
const instructors = require('./app/controllers/instructors')
// chamar o arquivo de criação update e delete members
const members = require('./app/controllers/members')

//rotas para redirecionar para a pasta instructors
routes.get('/', function(req, res) {
    return res.redirect("/instructors")
}) 

//rotas INSTRUTORES
//rota para a pasta instructors
routes.get('/instructors', instructors.index)
//rota de criação de cadastro para instrutores
routes.get('/instructors/create', instructors.create)
//rota para mostrar os dados do instrutor selecionado
routes.get("/instructors/:id", instructors.show)
//rota para a edição de dados do instrutor
routes.get("/instructors/:id/edit", instructors.edit)
//rota para envio de formulário
routes.post("/instructors", instructors.post)
//rota para atualização de formulario
routes.put("/instructors", instructors.put)
//rota para deletar um instrutor
routes.delete("/instructors", instructors.delete)

//rotas MEMBROS
//rota para a pasta members
routes.get('/members', members.index)
//rota de criação de cadastro para member
routes.get('/members/create', members.create)
//rota para mostrar os dados do member selecionado
routes.get("/members/:id", members.show)
//rota para a edição de dados do member
routes.get("/members/:id/edit", members.edit)
//rota para envio de formulário
routes.post("/members", members.post)
//rota para atualização de formulario
routes.put("/members", members.put)
//rota para deletar um member
routes.delete("/members", members.delete)


//exportas os arquivos
module.exports = routes