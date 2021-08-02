require('dotenv').config();      // importation du paquet dotenv pour les variables d'environnement
const jwt = require('jsonwebtoken');        // importation du paquet jwt

module.exports = (req, res, next) => {
    try {                                                                               
        const token = req.headers.authorization.split(' ')[1];                          
        const decodedToken = jwt.verify(token, process.env.JWT_AUTH_SECRET_TOKEN);     
        const userId = decodedToken.userId;                                             
        if (req.body.userId && req.body.userId !== userId) {                            
            res.status(401).json({ error: "Requête non autorisée !" });                 
        } else {
            next();                                                                    
        }
    } catch {
        res.status(401).json({ error: "Requête non authentifiée !" });                 
    }
};