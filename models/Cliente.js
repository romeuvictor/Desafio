const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cliente = new Schema({
    nome: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
    conta: {
        type: Number,
        require: true
    },
    saldo: {
        type:  Number,
        require: true
    },
    date: {
         type: Date,
         default: Date.now()
    }
})
mongoose.model('clientes', Cliente)
