const jwt = require("jsonwebtoken");
function authenticate( req, res, next ) {
    const token = req.header( 'Authorization' );
    console.log( token );
    if( !token ) {
        return res.status( 403 ).json({
            message: 'Token is not sent'
        });
    }
    jwt.verify(token, 'shh...', function(err, claims) {
        if( err ) {
            return res.status( 403 ).json({
                message: 'Go away intruder'
            });
        }
        req.claims=claims;
        console.log(token)
        req.header.Authorization = token;
        next();
    });
}
module.exports={
    authenticate
}
