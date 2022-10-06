'use strict'; 

const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

var confiq = require('../config/confiq');
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = confiq.secret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findByPk(jwt_payload.userid)
	.then(data => {
		if(data){
			return done(null,data);
		}else{
			return done("User tidak terdaftar", false);
		}
	})
	.catch(err => {
		return done("User tidak terdaftar", false);
	});
}))