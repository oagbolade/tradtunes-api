var models = require('../models');
const AudioCat = models.AudioCat


exports.CreateAudioCat = (req, res) => {
    const newAudioCat = {
        name: req.body.name,
    }
    AudioCat.create(newAudioCat)
        .then(AudioCat => res.json(AudioCat))
        .catch(err => res.json(err));
}


exports.UpdateAudioCat = (req, res) => {
    AudioCat.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(audioCat => {
            audioCat.update({
                name: req.body.name,

            }).then((audioCat) => {
                res.json(audioCat)
            })
        })
        .catch(err => res.status(404).json({
            noaudioCat: 'No audioCat found'
        }));
}

exports.RetrieveAllAudioCat = (req, res) => {
    AudioCat.findAll({
        raw: true
    })
        .then(audioCat => res.json(audioCat))
        .catch(err => res.status(404).json({
            noaudioCat: 'No audioCat found'
        }));
}

exports.RetrieveAudioCat = (req, res) => {
    AudioCat.findOne({
        where: {
            name: req.params.name
        }
    }).then(audioCat => {
        if (audioCat) {

            res.json(audioCat)
        } else {
            res.status(404).json({
                noaudioCat: 'No audioCat found'
            })


        }
    }
    )
        .catch(err => res.status(404).json({
            noaudioCat: 'No audioCat found'
        }));
}

exports.DeleteAudioCat = (req, res) => {
    AudioCat.findOne({
        where: {
            id: req.params.id
        }
    }).then(audioCat => {
        if (audioCat !== null) {
            audioCat.destroy().then(() => {
                res.json({
                    success: true
                })
            }).catch((err) => {
                res.status(404).json({
                    error: 'something went wrong'
                })
            })
        }
        else {
            res.status(404).json({
                noaudioCat: 'No audioCat found'
            })


        }
    })
}

exports.UndoSoftdelAudioCat = (req, res) => {
    AudioCat.findOne({
        where: {
            id: req.params.id,
        },
        paranoid: false
    }).then(audioCat => {
        if (audioCat !== null) {
            audioCat.restore();
            res.json({
                success: true
            })
        } else {
            res.status(404).json({
                noaudioCat: 'audioCat not found'
            })
        }
    })
}
