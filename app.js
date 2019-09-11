// Carregando Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path');
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const moment = require('moment')
//configurações
app.use(session({
    secret: 'bancoromeu',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//Configurações
       //Body Parser
            app.use(bodyParser.urlencoded({extended: true}))
            app.use(bodyParser.json())
        //handlebars
            app.engine('handlebars', handlebars({
            defaultLayout: 'main',
            helpers:{
                formatDate: (date)=>{
                    return moment(date).format('DD/MM/YYYY')
                }
            }
        }))
            app.set('view engine', 'handlebars');
        //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/banco', {useNewUrlParser: true}).then(()=>{
             console.log("Mongo Conectado!...")
        }).catch((err)=>{
            console.log("Houve um erro ao se conectar ao mongoDB"+err)
        })
        //public
        app.use(express.static(path.join(__dirname, 'public')));
        
        //Rotas
        app.get('/',(req, res) =>{
            res.render('index')
        })
   
    

     app.use('/admin', admin)

 
//Outros
const PORT = 8081
app.listen(PORT,()=>{
    console.log("Servidos Rodando!")
})