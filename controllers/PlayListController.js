var models = require('../models');
const PlayListAudio = models.PlayListAudio



exports.CreatePlayList = (req, res) => {

    PlayListAudio.create({
        albumName: req.body.albumName,
        artist: req.body.artist,
        name: req.body.name,
        art: req.body.art,
        audio: req.body.audio,
        userId: req.user.id
    }).then(playlist => res.json(playlist))
        .catch(err => console.log(err))

};






exports.UpdatePlayList = (req, res) => {

    PlayListAudio.findOne({
        where: {
            userId: req.user.id
        }
    })
        .then(playlist => {
            playlist
                .update({
                    albumName: req.body.albumName,
                    artist: req.body.artist,
                    name: req.body.name,
                    art: req.body.art,
                    audio: req.body.audio
                })
                .then(playlist => {
                    res.json(playlist);
                });
        })

};


exports.DeletePlayList = (req, res) => {
    PlayListAudio.findOne({
        where: {
            id: req.params.id
        }
    }).then(playlist => {
        if (playlist !== null) {
            playlist
                .destroy()
                .then(() => {
                    res.json({
                        success: true
                    });
                })
                .catch(err => {
                    res.status(404).json({
                        error: 'something went wrong'
                    });
                });
        } else {
            res.status(404).json({
                noplaylist: 'No playlist found'
            });
        }
    });
};



exports.RetrievePlayList = (req, res) => {
    PlayListAudio.findOne({
        where: {
            userId: req.user.id
        },
    })
        .then(PlayList => {
            if (PlayListAudio) { res.json(PlayList) }
            else {
                res.status(404).json({ nopostfound: 'No PlayListAudio found with that ID' })
            }
        }
        )
        .catch(err =>
            res.status(404).json({
                err
            })
        );
};