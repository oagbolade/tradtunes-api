var models = require('../models');
const VideoCat = models.VideoCat


exports.CreateVideoCat = (req, res) => {
    const newVideoCat = {
        name: req.body.name,
    }
    VideoCat.create(newVideoCat)
        .then(VideoCat => res.json(VideoCat))
        .catch(err => console.log(err));
}


exports.UpdateVideoCat = (req, res) => {
    VideoCat.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(videoCat => {
            videoCat.update({
                name: req.body.name,

            }).then((videoCat) => {
                res.json(videoCat)
            })
        })
        .catch(err => res.status(404).json({
            novideoCat: 'No videoCat found'
        }));
}

exports.RetrieveAllVideoCat = (req, res) => {
    VideoCat.findAll({
        raw: true
    })
        .then(videoCat => res.json(videoCat))
        .catch(err => res.status(404).json({
            novideoCat: 'No videoCat found'
        }));
}

exports.RetrieveVideoCat = (req, res) => {
    VideoCat.findOne({
        where: {
            name: req.params.name
        }
    }).then(videoCat => {
        if (videoCat) {

            res.json(videoCat)
        } else {
            res.status(404).json({
                novideoCat: 'No videoCat found'
            })


        }
    })
        .catch(err => res.status(404).json({
            novideoCat: 'No videoCat found'
        }));
}

exports.DeleteVideoCat = (req, res) => {
    VideoCat.findOne({
        where: {
            id: req.params.id
        }
    }).then(videoCat => {
        if (videoCat !== null) {
            videoCat.destroy().then(() => {
                res.json({
                    success: true
                })
            }).catch((err) => {
                res.status(404).json({
                    error: 'something went wrong'
                })
            })
        } else {
            res.status(404).json({
                novideoCat: 'No videoCat found'
            })


        }
    })
}

exports.UndoSoftdelVideoCat = (req, res) => {
    VideoCat.findOne({
        where: {
            id: req.params.id,
        },
        paranoid: false
    }).then(videoCat => {
        if (videoCat !== null) {
            videoCat.restore();
            res.json({
                success: true
            })
        } else {
            res.status(404).json({
                novideoCat: 'videoCat not found'
            })
        }
    })
}
