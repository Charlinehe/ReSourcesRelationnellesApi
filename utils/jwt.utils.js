const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const JWT_SECRET = 'vJYGob5481veH8kjFgyvjo488LPO4mjbuHM59'

module.exports = {

    generateTokenForUser: (user) => {
        return jwt.sign({
            userId: user.userId,
            username: user.username
        },
        JWT_SECRET, 
        {
            expiresIn: '1h'
        })
    },

    checkToken: (token) => {

        if (!token) {
            return JSON.parse('{ "error": "Accès non autorisé - token attendu" }')
        }

        return jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return JSON.parse('{ "error": "Accès non autorisé - token invalide" }')
            } else {
                return parseJwt(token)
            }
        })
    }
}

function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }