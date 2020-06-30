//Requisição do model Instructor
const Instructor = require('../models/Instructor')
const { age, date } = require('../../lib/utils')


module.exports = {

    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1 //shorthand
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            page,
            limit,
            offset,
            filter,
            callback(instructors) {
                let mathTotal = instructors[0] == undefined ? 0 : Math.ceil(instructors[0].total / limit)

                const pagination = {
                    total: mathTotal,
                    page
                }
                return res.render("instructors/index", { instructors, pagination, filter })

            }
        }

        Instructor.paginate(params)

    },
    create(req, res){
        return res.render('instructors/create')
    },
    show(req, res){
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },
    post(req, res){

        //Cria um arrey com os dados do formulário de resposta na seguinte ordem:
        //["avatar_url","name","birth","gender","services"]
        const keys = Object.keys(req.body)

        //loop para validar os dados das entradas
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields! ")
        }

        Instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        })

    },
    edit(req, res){
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields! ")
        }

        Instructor.update(req.body, function() {
        return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res){

        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
            })
    },

}
