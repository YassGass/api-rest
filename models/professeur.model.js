const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProfesseurSchema = new Schema({
    nom: {type:String, required:true},
    prenom:{type:String, required:true},
    email:{type:String, required:true},
    identifiant:{type:String, required:true},
    mdp: {type:String, required:true},
    avatar:{type:String}
});

module.exports = mongoose.model('Professeur', ProfesseurSchema);