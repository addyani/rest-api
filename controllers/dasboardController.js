const db = require('../models');
const User = db.users;
const Word = db.words;
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const confiq = require('../config/confiq');

class dasboardController {
    static getAllDasboard (req, res, next) {
        Word.findAll()
        .then(words => {
            res.send(words)
        })
        .catch(err => {
            res.send(err)
        });
    }

    static getLogin (req, res, next) {
        res.json({
            info: "Anda Berada Dihalaman Login"
        });
    }

    static postLogin (req, res, next) {
        User.findOne({ where: { username: req.body.username } })
        .then(data => {
            var validPassword = bcrypt.compareSync(req.body.password, data.password);
            if(validPassword) {
                var payload = {
                    userid: data.id,
                    username: data.username
                  };
            
                  let token = jwt.sign(
                    payload,
                    confiq.secret, {
                      expiresIn: '3h'
                    }
                  );
                  let dt = new Date();
                  dt.setHours(dt.getHours()+3);
            
                  res.json({
                    success: true,
                    token: token,
                    expired: dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
                  });
            } else {
                res.json({
                    info: "Periksa Kembali Password Dan Email"
                });
            }	
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getRegister (req, res, next) {
        res.json({
            info: "Anda Berada Dihalaman Pendaftaran"
        });
    }

    static postRegister (req, res, next) {
        if(!(req.body.name && req.body.email && req.body.username && req.body.password)) {
            res.json({
                info: "Data Belum Lengkap"
            });
          }
          else {
            var hashpass = bcrypt.hashSync(req.body.password, 8);
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hashpass
            }
            User.create(user)
            .then(data => {
                res.json({
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: "Secret!"
                  });
            })
            .catch(err => {
                res.send(err);
            });
        }
    }

    static getLogout (req, res, next) {
        res.json({
            info: "Anda Telah Logout"
        });
    }

    static getRestore (req, res, next) {
        Word.restore()
        .then(num => {
            res.json({
                info: "Soft Delete Telah Diabatalkan"
            });	
        })
        .catch(err => {
            res.send(err);
        });
    }
}

module.exports = dasboardController