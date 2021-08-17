require('dotenv').config();      // importation du paquet dotenv pour les variables d'environnement
const validator = require("validator");     // importation du paquet validator
const mysql = require('mysql');       // importation du paquet mysql
const bcrypt = require ('bcrypt');       // importation du paquet bcrypt
const jwt = require('jsonwebtoken');        // importation du paquet jwt

const bdd = require("../bdd_config/bdd_connexion");     // importation de la connexion a la base de données


let decodeToken = function(req){                                                    
    let token = req.headers.authorization.split(' ')[1];                            
    let decodedToken = jwt.verify(token, process.env.JWT_AUTH_SECRET_TOKEN);        
    decodedToken = [decodedToken.userId, decodedToken.niveau_acces];                
    return decodedToken;                                                            
}


exports.signup = (req, res, next) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;

    if (validator.isEmail(String(email))) {                    
        bcrypt.hash(password, 10, (error, hash) => {           
                const hash2 = bcrypt.hashSync(email, 5)
                let sql = "INSERT INTO users (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)";     
                let inserts = [nom, prenom, hash2, hash];                                                       
                sql = mysql.format(sql, inserts);                                                                                   
    
                const userSignup = bdd.query(sql, (error, user) => {            
                    if (!error) {                                               
                        res.status(201).json({                                  
                            message: "L'utilisateur a été créé avec succès !",  
                            token: jwt.sign(                                    
                                { userId: user.insertId, niveau_acces: 0 },     
                                process.env.JWT_AUTH_SECRET_TOKEN,              
                                { expiresIn: process.env.JWT_EXPIRATION }       
                            )
                        });
                    } else {
                        return res.status(409).json({ error : "Cet utilisateur existe déjà !"})      
                    }
                });
            });
    } else {
        return res.status(400).json({ error : "Votre email est invalide !"})      
    }
};


exports.login = (req, res, next) => {
    const nom = req.body.nom;
    const Lemail = req.body.email; 
    const password = req.body.password;

    if (validator.isAscii(String(nom))) {
        let sql= "SELECT id, email, mot_de_passe, niveau_acces FROM users WHERE nom = ?";     
        let inserts = [nom];                                                                  
        sql = mysql.format(sql, inserts);  
        const userLogin = bdd.query(sql, (error, user) => {                                             //envoi de la requête à la bdd                         
            if (error) {                                                                                //si aucune correspondance
                return res.status(400).json({ error : "Votre nom est invalide !" })                     //le nom est invalide
            }
            /*if (user.length === 0) {
                res.status(400).json({ error: "Une erreur est survenue, utilisateur non trouvé !" })    //utilisateur introuvable
            } */ else {                              
            
            let bool = bcrypt.compareSync(Lemail, user[0].email)
            console.log(Lemail);
            console.log(user[0].email);
            console.log(bool);
                if(bool == false)
                {
                    res.status(400).send("email non valide")
                } else {
                    res.send("l'email correspond")
                }               

            let bool2 = bcrypt.compareSync(password, user[0].mot_de_passe)
            console.log(password);
            console.log(user[0].mot_de_passe);
            console.log(bool2);
                if(bool2 == false)
                {
                    res.status(400).json({ error : "Mot de passe non valide"})
                } else {
                    res.status(200).json({                                                  
                        message: "Vous êtes désormais connecté !",                                                                
                        token: jwt.sign(                                                    
                            { userId: user[0].id, niveau_acces: user[0].niveau_acces },     
                            process.env.JWT_AUTH_SECRET_TOKEN,                              
                            { expiresIn: process.env.JWT_EXPIRATION }
                        )
                    });
                }       
            };
        });
    };
};
exports.getOneUser = (req, res, next) => {

    const tokenInfos = decodeToken(req);        
    const userId = tokenInfos[0];               

    if (userId === Number(req.params.id)) {
        let sql = "SELECT nom, prenom, email FROM users WHERE id = ?";  
        let inserts = [userId];                                                             
        sql = mysql.format(sql, inserts);                                                   

        const userGetInfos = bdd.query(sql, (error, result) => {                            
            if (error) {
                res.status(400).json({ error: "Une erreur est survenue, utilisateur non trouvé !" });          
            }
            if (result.length === 0) {
                res.status(400).json({ error: "Une erreur est survenue, utilisateur non trouvé !" })           
            } else {
                res.status(200).json(result[0]);
            }
        });
    } else {
        res.status(401).json({ error: "Action non autorisée !" });
    }
};

exports.updateOneUser = (req, res, next) => { 

    const tokenInfos = decodeToken(req);            
    const userId = tokenInfos[0];                   

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;
    const newpassword = req.body.newpassword;

    if (validator.isAscii(String(nom))) {     
        if(!password & !newpassword) {   
            const hash3 = bcrypt.hashSync(email, 5);                                                                           //Si les 2 mots de passe sont vides                                                             
            let sql = "UPDATE users SET nom = ?, prenom = ?, email = ?, WHERE id = ?";       
            let inserts = [nom, prenom, hash3, userId];                                             
            sql = mysql.format(sql, inserts);                                                                           
            const userUpdateWithoutNewPassword = bdd.query(sql, (error, result) => {                                    
                if (error) {
                    res.status(400).json({ error: "La mise à jour des informations de l'utilisateur a échoué" });
                } else {
                    res.status(200).json({ message: "Informations utilisateur mises à jour avec succès !" });
                }
            });
        } else {
            let sql= "SELECT mot_de_passe FROM users WHERE id = ?";                                                     
            let inserts = [userId];                                                                                     
            sql = mysql.format(sql, inserts);                                                                           
            const userGetPassword = bdd.query(sql, (error, result) => {
                if (error) {                                                                                            
                    res.status(400).json({ error: "Une erreur est survenue, utilisateur non trouvé !" })                
                }
                if (result.length === 0) {
                    res.status(400).json({ error: "Une erreur est survenue, utilisateur non trouvé !" })                
                } else {
                    bcrypt.compare(password, result[0].mot_de_passe).then((valid) => {                  
                        if (!valid) {                                                                   
                            res.status(400).json({ error : "Mot de passe actuel invalide !" })          
                        } else {
                            bcrypt.hash(newpassword, 10, (error, hash) => {
                                const hash3 = bcrypt.hashSync(email, 5);
                                let sql = "UPDATE users SET nom = ?, prenom = ?, email = ?, mot_de_passe = ? WHERE id = ?";
                                let inserts = [nom, prenom, hash3, hash, userId];
                                sql = mysql.format(sql, inserts);
                                const userUpdateWithNewPassword = bdd.query(sql, (error, result) => {
                                    if (error) {
                                        res.status(400).json({ error: "La mise à jour des informations de l'utilisateur a échoué" });
                                    } else {
                                        res.status(200).json({ message: "Informations et nouveau mot de passe utilisateur mis à jour avec succès !" });
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    } else {
        res.status(400).json({ error : "Votre email est invalide !" })      
    }
};

exports.deleteOneUser = (req, res, next) => {
    
    const tokenInfos = decodeToken(req);        
    const userId = tokenInfos[0];               

    if (userId === Number(req.params.id)) {     
        let sql = "DELETE FROM users WHERE id = ? ";
        let inserts = [userId];
        sql = mysql.format(sql, inserts);

        const userDelete = bdd.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error: "Une erreur est survenue, utilisateur non trouvé !" });
            } else {
                res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
            }
        });
    } else {
        res.status(400).json({ error: "Action non autorisée !" });
    }
};