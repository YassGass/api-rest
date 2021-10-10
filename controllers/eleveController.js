const eleveModel = require('../models/eleve.model');
const EleveModel = require('../models/eleve.model');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

module.exports = {
    signup: (req, res)=> {
        bcrypt.hash(req.body.mdp, 10, (err, hash)=> {
            if(err){
                return res.status(500).json({
                    status: 500,
                    message:err.message

                })
            }
            
            const newEleve = new Professeur({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                identifiant: req.body.identifiant,
                mdp: hash
            })
            
            newEleve.save((err, eleve)=> {
                if(err){
                    return res.status(400).json({
                        status:400,
                        message:err.message
                    })
                }
                return res.status(201).json({
                    status:201,
                    message: 'Professeur created'
                })
            })
        })
    },

    login: (req, res)=> {
        Eleve.findOne({email: req.body.email}, (err, eleve)=>{
            if (err){
                return res.status(404).json({
                    status: 404,
                    message: 'User not found !'
                })
            }
            bcrypt.compare(req.body.mdp, eleve.mdp, (err, valid)=>{
                if (err){
                    return res.status(500).json({
                        status: 500,
                        message: err.message 
                    })
                }
                if (!valid){
                    return res.status(401).json({
                        status: 401,
                        message: 'mauvais mot de passe'
                    })
                }

                return res.status(200).json({
                    eleveId : eleve._id,
                    token: jwt.sign(
                        {eleveId : eleve._id},
                        process.env.SECRET_TOKEN,
                        {expiresIn:'24h'}
                    )
                })
            })
        })
    }
    
}