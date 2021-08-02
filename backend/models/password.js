const passwordValidator = require('password-validator');        // importation du paquet password validator

const passwordSchema = new passwordValidator();     // Schéma de mot de passe

passwordSchema
.is().min(8)                                    
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                 
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

module.exports = passwordSchema;