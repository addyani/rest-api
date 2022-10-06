const db = require('../models');
const Comment = db.comments;

class commentController {
    static postAddComment (req, res, next) {
        let id = req.params.id;
        let replyid = req.params.idreply;
        if(!(req.body.name && req.body.comment)) {
            res.json({
                info: "Data Belum Lengkap"
            });
        }
        if (replyid == 0) {
            replyid = null
        } 
        else {
            id = null
        }
    
        var comment = {
            name: req.body.name,
            comment: req.body.comment,
            idword: id,
            replyid: replyid,
            replystatus: false,
            showstatus: false
        }
        var back = {
            replystatus: false,
            showstatus: false
        }
        Comment.update(back, {
            where: {id: replyid}
        })
        Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.json({
                info: "Comment Error",
                Status: err
            })
        });
    }

    static getReplyComment (req, res, next) {
        const idword = req.params.id;
        const id = req.params.idreply;
        var comment = {
            replystatus: true
        }
        Comment.update(comment, {
            where: {id: id}
        })
        .then( data => {
            res.json({
                info: "Munculin Form Reply"
            });
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getCancelComment (req, res, next) {
        const idword = req.params.id;
        const id = req.params.idreply;
        var comment = {
            replystatus: false
        }
        Comment.update(comment, {
            where: {id: id}
        })
        .then( data => {
            res.json({
                info: "Hilangin Form Reply"
            });
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getShowComment (req, res, next) {
        const idword = req.params.id;
        const id = req.params.idreply;
        var comment = {
            showstatus: true
        }
        Comment.update(comment, {
            where: {id: id}
        })
        .then( data => {
            res.json({
                info: "Munculin Reply Yang Ada"
            });
        })
        .catch(err => {
            res.send(err);
        });
    }

    static getHideComment (req, res, next) {
        const idword = req.params.id;
        const id = req.params.idreply;
        var comment = {
            showstatus: false
        }
        Comment.update(comment, {
            where: {id: id}
        })
        .then( data => {
            res.json({
                info: "Hidden Reply Yang Ada"
            });
        })
        .catch(err => {
            res.send(err);
        });
    }
}

module.exports = commentController