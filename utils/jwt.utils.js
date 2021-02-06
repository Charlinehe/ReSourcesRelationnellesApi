const jwt = require('jsonwebtoken')
const JWT_SECRET = 'vJYGob5481veH8kjFgyvjo488LPO4mjbuHM59'

module.exports = {
    generateTokenForUser: function(username) {
        return jwt.sign({
            userId: username
        },
        JWT_SECRET, 
        {
            expiresIn: '1h'
        })
    }
}