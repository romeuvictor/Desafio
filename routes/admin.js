const express = require('express')
const router =  express.Router()
const mongoose = require('mongoose')
require('../models/Cliente')

const Cliente = mongoose.model('clientes')


router.get('/', (req, res) =>{
    res.render('admin/index')
})
router.get('/clientes', (req, res) =>{
   Cliente.find().sort({date:'desc'}).then((clientes) =>{
       res.render('admin/clientes', {clientes: clientes})
   }).catch((err) => {
       res.flash('error_msg', 'Houve um erro ao listar os clientes')
       res.redirect('/admin')
   })
})

router.get("/extratoConta",(req, res)=>{
    res.render('admin/extratoConta')
        })

       


router.get('/todosSaldos', (req, res) =>{
       
    Cliente.find({_saldo: req.params.saldo}).sort({date:'desc'}).then((clientes) =>{
        res.render('admin/todosSaldos', {clientes: clientes})
    }).catch((err) => {
        res.flash('error_msg', 'Houve um erro ao listar os clientes')
        res.redirect('/admin')
    })
})
router.get('/relatorioDiario', (req, res) =>{
       
    Cliente.find(req.params.date).sort({date:'desc'}).then((clientes) =>{
        res.render('admin/relatorioDiario', {clientes: clientes})
    }).catch((err) => {
        res.flash('error_msg', 'Houve um erro ao listar os clientes')
        res.redirect('/admin')
    })
})

router.get('/clientes/add', (req, res) =>{
    res.render('admin/addclientes')
})

router.post('/clientes/novo', (req, res) =>{
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: " Nome Inválido"})
    }
    if(!req.body.idade || typeof req.body.idade== undefined || req.body.idade == null){
        erros.push({texto:" idade Inválido"})
    }
    if(!req.body.endereco || typeof req.body.endereco== undefined || req.body.endereco == null){
        erros.push({texto:" Endereço Inválido"})
    }
    if(!req.body.conta || typeof req.body.conta== undefined || req.body.conta == null){
        erros.push({texto:"Numero da conta Inválido"})
    }
    if(!req.body.saldo || typeof req.body.saldo== undefined || req.body.saldo == null){
        erros.push({texto:"valor do saldo Inválido"})
    }
    if(erros.length > 0){
        res.render('admin/addclientes', {erros: erros })
    }else{
    
        const novoCliente = {
            nome: req.body.nome,
            idade: req.body.idade,
            endereco: req.body.endereco,
            conta: req.body.conta,
            saldo: req.body.saldo
        }
       
        new Cliente(novoCliente).save().then(() =>{
            req.flash('success_msg', "Cliente cadastrado com sucess!")
            res.redirect('/admin/clientes')
        }).catch((err) =>{
            req.flash('error_msg', "Houve um erro ao cadastrar o cliente, tente novamente!")
            res.redirect('/admin')
        })
    }
})
router.get("/clientes/editar/:id", (req, res)=>{
    Cliente.findOne({_id: req.params.id}).then((Clientes)=>{
        res.render('admin/editarcliente', {Clientes: Clientes})
    }).catch((err) =>{
        req.flash('error_msg', "Esse cliente não existe")
        res.redirect("/admin/clientes")
    })
})

router.post("/clientes/editar",(req, res)=>{
    Cliente.findOne({_id: req.body.id}).then((clientes)=>{
        clientes.nome = req.body.nome
        clientes.idade = req.body.idade
        clientes.endereco = req.body.endereco
        clientes.conta = req.body.conta
      
        
        Cliente.save().then(()=>{
            req.flash("success_msg", "Dados alterado com sucesso!")
            req.redirect('/admin/clientes')
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao editar o cliente")
            res.redirect('/admin/clientes')
        })

       
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar o cliente")
        res.redirect('/admin/clientes')
    })
})



module.exports = router