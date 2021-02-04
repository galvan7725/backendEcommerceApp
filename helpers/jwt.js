const expressJwt = require('express-jwt');

const authJwt = ()=>{
    try {
        const secret = process.env.SECRET;
        const API_URL = process.env.API_URL;
        return expressJwt({
            secret,
            algorithms: ['HS256'],
            isRevoked: isRevoked
        }).unless({
            path: [
                {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
                {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
                `${API_URL}/users/login`,
                `${API_URL}/users/register`    
            ]
        })
    } catch (error) {
        console.log(error);
    }
   
}

const isRevoked = async(req, payload, done) => {
    if(!payload.isAdmin){
        done(null, true);
    }

    done();
}


module.exports = authJwt;