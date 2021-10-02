const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const Professeur = require('../models/professeur.model');
const dotenv = require('dotenv').config();


module.exports= {
    signup: (req, res)=> {
        bcrypt.hash(req.body.mdp, 10, (err, hash)=> {
            if(err){
                return res.status(500).json({
                    status: 500,
                    message:err.message

                })
            }
            
            const newProfesseur = new Professeur({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                identifiant: req.body.identifiant,
                mdp: hash
            })
            
            newProfesseur.save((err, professeur)=> {
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
        Professeur.findOne({email: req.body.email}, (err, professeur)=>{
            if (err){
                return res.status(404).json({
                    status: 404,
                    message: 'User not found !'
                })
            }
            bcrypt.compare(req.body.mdp, professeur.mdp, (err, valid)=>{
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
                    professeurId : professeur._id,
                    token: jwt.sign(
                        {professeurId : professeur._id},
                        process.env.SECRET_TOKEN,
                        {expiresIn:'24h'}
                    )
                })
            })
        })
    }
}