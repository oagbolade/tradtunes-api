var models = require('../models');
const Video = models.Video
const VideoLikes = models.VideoLikes
const User = models.User
const VideoCat = models.VideoCat
const Artist = models.Artist
const VideoComment = models.VideoComments
const validateVideoInput = require('../util/validation/mediaEmpty');
const isEmpty = require('../util/validation/isEmpty')

// Validation
const validatePostInput = require('../util/validation/post');

exports.UploadVideo = (req, res) => {

    const { errors, isValid } = validateVideoInput(req.file);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }


    const newVideo = {
        videoId: req.file.public_id,
        video: req.file.url,
        name: req.body.name,
        artist: req.body.artist,
        artistId: req.body.artistId,
        videoCatId: req.body.videoCatId

    }
    Video.create(newVideo)
        .then(video => res.json(video))
        .catch(err => console.log(err));
}


exports.UpdateVideo = (req, res) => {
    Video.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(Video => {
            Video.update({
                name: req.body.name,
            }).then((video) => {
                res.json(video)
            })
        })
        .catch(err => res.status(404).json({
            novideofound: 'No video found'
        }));
}

exports.RetrieveAllVideo = (req, res) => {
    Video.findAll({
        raw: true,
        include: [
            {
                model: Artist,
                required: false
            },
            {
                model: VideoCat,
                required: false
            }
        ]
    })
        .then(video => res.json(video))
        .catch(err =>
            res.status(404).json({
                noaudiofound: 'No audio found'
            })
        );
}

exports.RetrieveVideoById = (req, res) => {
    Video.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Artist,
                required: false
            },
            {
                model: VideoCat,
                required: false
            }
        ]

    }).then(video => {
        if (video) { res.json(video) }
        else {
            res.status(404).json({ novideofound: 'No video found with that Id' })
        }
    }
    )
        .catch(err => res.status(404).json({
            novideofound: 'No video found'
        }));
}

exports.RetrieveVideoByName = (req, res) => {
    Video.findOne({
        where: {
            name: req.params.name
        },
        include: [
            {
                model: Artist,
                required: false
            },
            {
                model: VideoCat,
                required: false
            }
        ]
    }).then(video => {
        if (video) { res.json(video) }
        else {
            res.status(404).json({ novideofound: 'No video found with that Name' })
        }
    }
    )
        .catch(err => res.status(404).json({
            novideofound: 'No video found'
        }));
}
exports.RetrieveVideoByArtistID = (req, res) => {
    Video.findAll({
        where: {
            artistId: req.params.artistId
        },
        include: [
            {
                model: Artist,
                required: false
            },
            {
                model: VideoCat,
                required: false
            }
        ]
    })
        .then(video => res.json(video))
        .catch(err =>
            res.status(404).json({
                novideofound: 'No video found'
            })
        );
};

exports.UploadVideoArt = (req, res) => {
    Video.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(video => {
            video.update({
                art: req.file.url

            }).then((video) => {
                res.json(video)
            })
        })
}
exports.DeleteVideo = (req, res) => {
    Video.findOne({
        where: {
            id: req.params.id
        }
    }).then(video => {
        if (video !== null) {
            video.destroy().then(() => {
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
                novideoCat: 'No videoCat found'
            })
        }
    })
}

exports.UndoSoftdelVideo = (req, res) => {
    Video.findOne({
        where: {
            id: req.params.id,
        },
        paranoid: false
    }).then(video => {
        if (video !== null) {
            video.restore();
            res.json({
                success: true
            })
        } else {
            res.status(404).json({
                novideofound: 'video not found'
            })
        }
    })
}





exports.LikeUnlikeVideo = (req, res) => {
    User.findOne({ where: { id: req.user.id } }).then(user => {
        // VideoLikes.findAll({ where: { videoId: req.params.id } }).then(likes => {
        //     if (isEmpty(likes) !== true) {
        //         if (likes.filter(like => like.userId === req.user.id).length > 0
        //         ) {
        //             VideoLikes.findOne({ where: { userId: req.user.id } }).then(like => {
        //                 like.destroy().then(() => {
        //                     res.json({
        //                         success: true
        //                     })
        //                 })
        //             })
        //         }
        //         VideoLikes.create({
        //             videoId: req.params.id,
        //             userId: user.id

        //         })
        //             .then(video => res.json(video))
        //             .catch(err => {
        //                 res.json({
        //                     err: "Something went wrong"
        //                 })
        //             });


        //     } else {
        //         VideoLikes.create({
        //             videoId: req.params.id,
        //             userId: user.id

        //         })
        //             .then(video => res.json(video))
        //             .catch(err => {
        //                 res.json({
        //                     err: "Something went wrong"
        //                 })
        //             });

        //     }


        // })


        VideoLikes.findOne({ where: { userId: req.user.id } }).then(like => {
            if (isEmpty(like) !== true) {
                like.destroy().then(() => {
                    res.json({
                        err: "unlike successful"
                    })
                })
                    .catch(err => {
                        res.json({
                            err: "Something went wrong"
                        })
                    });
            }
            else {
                VideoLikes.create({
                    videoId: req.params.id,
                    userId: user.id

                })
                    .then(video => res.json({
                        err: "like successful"
                    }))
                    .catch(err => {
                        res.json({
                            err: "Something went wrong"
                        })
                    });
            }
        })


    })


}

exports.getLikes = (req, res) => {

    VideoLikes.findAll({ where: { videoId: req.params.id } }).then(likes => { res.json(likes) }).catch(err => {
        res.json({
            err: "Something went wrong"
        })
    });


}

exports.getComment = (req, res) => {

    VideoComment.findAll({ where: { videoId: req.params.id } }).then(comment => { res.json(comment) }).catch(err => {
        res.json({
            err: "Something went wrong"
        })
    });


}

exports.UnLikeVideo = (req, res) => {
    User.findOne({ where: { id: req.user.id } }).then(user => {
        VideoLikes.findAll({ where: { videoId: req.params.id } }).then(likes => {
            if (isEmpty(likes) !== true) {
                if (likes.filter(like => like.userId === req.user.id).length === 0
                ) {
                    return res
                        .status(400)
                        .json({ notliked: 'You have not yet liked this post' });
                } else {
                    VideoLikes.findOne({ where: { userId: req.user.id } }).then(like => {
                        like.destroy().then(() => {
                            res.json({
                                success: true
                            })
                        })
                    })
                }

            } else {
                return res
                    .status(400)
                    .json({ notliked: 'there no likes yet for this post' });
            }


        })
    })

}

exports.AddAudioComment = (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    VideoComment.create({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        userId: req.user.id,
        videoId: req.params.id

    }).then(comment => res.json(comment)).catch(err => res.status(404).json({ videonotfound: 'No video found' }));

}

exports.DeleteAudioComment = (req, res) => {
    VideoComment.findOne({ where: { id: params.id } }).then(comment => {
        comment.destroy().then(() => {
            res.json({
                success: true
            })
        })
    })
}


exports.RetrieveVideoByVideoCatID = (req, res) => {
    Video.findAll({
        where: {
            videoCatId: req.params.videoCatId
        },
        include: [
            {
                model: Artist,
                required: false
            },
            {
                model: VideoCat,
                required: false
            }
        ]
    })
        .then(video => res.json(video))
        .catch(err =>
            res.status(404).json({
                novideofound: 'No video found'
            })
        );
};