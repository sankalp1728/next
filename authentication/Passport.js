const Keys = require('../keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const SuperAdmin = require('../models/superAdmin')
const User = mongoose.model('User')
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : Keys.secret_key
}

module.exports = (passport) =>{
    passport.use(
        new JwtStrategy(opts,(Jwt_payload, done) => {
            User.findOne({email : Jwt_payload.email})
                .then(user => {
                    if(user){
                        return done(null, user)
                    }
                    SuperAdmin.findOne({email : Jwt_payload.email})
                    .then(user=>{
                        if(user){
                            return done(null, user)
                        }
                        return done(null, false)
                    })
                })
                .catch(err=>{
                    console.log(err);
                })  
        })
    )}