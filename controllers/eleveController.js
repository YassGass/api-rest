const eleveModel = require('../models/eleve.model');
const EleveModel = require('../models/eleve.model');

module.exports = {
    list: (req, res) => {
        EleveModel.find((err,eleves)=>{
            if(err){
                return res.status(500).json({
                    status:500,
                    Message:'error when getting Eleve'
                })
            }
            return res.status(200).json({
                status:200,
                eleves:eleves
            })
        })
    },
    
    show:(req, res) =>{
        const id= req.params.id;
        EleveModel.findOne({id: id},(err, eleve)=>{
            if(err){
                return res.status(500).json({
                    status:500,
                    Message:'error when getting Eleve'
                })
            }
            if (!eleve){
                return res.status(404).json({
                status:404,
                Message:'no such Eleve'
            })

            }
            return res.status(200).json({
                status:200,
                eleves:eleves
            })
        });
    },

    create:(req, res) =>{
        var Eleve =new EleveModel({
            ...req.body
        });

        Eleve.save((err,Eleve)=>{
            if(err){
                return res.status(500).json({
                    Message:'error when getting Eleve',
                    error: err
                })
            }
            return res.status(201).json({
                status:201,
                Message:'eleve created'
            })
        });
    },

    update: (req, res)=> {
        const id = req.params.id;
        EleveModel.findOne({_id: id}, (err, Eleve)=>{
            if(err){
                return res.status(500).json({
                    status:500,
                    Message:'error when getting Eleve'
                })
            }
            if (!Eleve){
                return res.status(404).json({
                    status:404,
                    message: 'No such Eleve'
                })
            }
            Eleve.nom = req.body.nom ? req.body.nom : Eleve.nom;
            Eleve.prenom = req.body.prenom ? req.body.prenom : Eleve.prenom;
            Eleve.email = req.body.email ? req.body.email : Eleve.email;
            Eleve.identifiant = req.body.identifiant ? req.body.identifiant : Eleve.identifiant;
            Eleve.mdp = req.body.mdp ? req.body.mdp : Eleve.mdp;
            Eleve.avatar = req.body.avatar ? req.body.avatar : Eleve.avatar;


            Eleve.save((err, Eleve)=>{
                if(err){
                    return res.status(500).json({
                        status:500,
                        Message:'error when updating Eleve',
                        error: err
                    })
                }

                return res.status(200).json({
                    status:200,
                    message:'Eleve updated !'
                })
            })
        })
    },

    remove:(req, res)=> {
        const id = req.params.id;
        EleveModel.findByIdAndRemove(id, (err, Eleve)=>{
            if(err){
                return res.status(500).json({
                    status:500,
                    Message:'error when removing Eleve',
                    error: err
                })
            }
            if(!Eleve){
                return res.status(404).json({
                    status:404,
                    message: 'no such Eleve'
                })
            }
            return res.status(204).json({
                status:204,
                message:'Eleve deleted'
            })  
        })
    }
    
}