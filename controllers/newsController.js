const db = require('../models');
const Comment = db.comments;
const Word = db.words;

class newsController {
    static getAddNews (req, res, next) {
        res.json({
            info: "Anda Berada Dihalaman Buat Berita Baru"
        });
    }

    static postAddNews (req, res, next) {
        if(req.body.title) var title=req.body.title;
        if(req.body.author) var author=req.body.author;
        if(req.file.filename) var image=req.file.filename;
        if(req.body.content) var content=req.body.content; 
        var news = {
            title: title,
            author: author,
            image: image,
            content: content
        }
        Word.create(news)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getDetailNews (req, res, next) {
        var id = parseInt(req.params.id);
        Word.findOne({
            //include: [Comment],
            include: [{
                model: Comment,
                include: [{
                    model: Comment,
                    include: [{
                        model: Comment,
                        include: [{
                            model: Comment,
                            include: [{
                                model: Comment,
                                include: [Comment]
                            }]
                        }]
                    }]
                }]
            }],
            where: {id: id}
        })
        .then(data => {
            if(data){
                res.send(data)
            }else{
                res.json({
                    info: "Data Salah"
                });
            }	
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getUpdateNews (req, res, next) {
        var id = parseInt(req.params.id);
        Word.findByPk(id)
        .then(words => {
            if(words){
                res.send(words);
            }else{
                res.json({
                    info: "Data Salah"
                });
            }
        })
        .catch(err => {
            res.send(err);
        });
    }

    static postUpdateNews (req, res, next) {
        var id = req.params.id;
        if(req.body.title) var title=req.body.title;
        if(req.body.author) var author=req.body.author;
        if(req.file.filename) var image=req.file.filename;
        if(req.body.content) var content=req.body.content; 
        var news = {
            title: title,
            author: author,
            image: image,
            content: content
        }

        Word.update(news, {
            where: {id: id}
        })
        .then(num => {
            res.json ({
                info: "Berhasil DiUpdate"
            })
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getDeleteNews (req, res, next) {
        const id = req.params.id;
        Word.destroy({
            where: {id: id}
        })
        .then(num => {
            res.sendn(num);		
        })
        .catch(err => {
            res.send(err);
        });
    }
}

module.exports = newsController