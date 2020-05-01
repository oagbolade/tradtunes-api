var models = require('../models');
const User = models.User
const Album = models.Album
const Audio = models.Audio
const Artist = models.Artist
const AudioComment = models.AudioComments
const AudioLikes = models.AudioLikes
const isEmpty = require('../util/validation/isEmpty')
const validateAudioInput = require('../util/validation/mediaEmpty');
const AudioCat = models.AudioCat

// Validation
const validatePostInput = require('../util/validation/post');

exports.UploadAudio = (req, res) => {
  const { errors, isValid } = validateAudioInput(req.file);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Audio.create({
    audioId: req.file.audio_id,
    audio: req.file.url,
    name: req.body.name,
    artist: req.body.artist,
    albumId: req.body.albumId,
    artistId: req.body.artistId,
    audioCatId: req.body.audioCatId
  })
    .then(audio => res.json(audio))
    .catch(err => console.log(err));
};

exports.UpdateAudio = (req, res) => {
  Audio.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(audio => {
      audio
        .update({
          name: req.body.name
        })
        .then(audio => {
          res.json({
            success: true
          });
        });
    })
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};

exports.RetrieveAllAudio = (req, res) => {
  Audio.findAll({
    raw: true,
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ]
  })
    .then(audio => res.json(audio))
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};

exports.UploadAudioArt = (req, res) => {
  Audio.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(audio => {
      audio
        .update({
          art: req.file.url
        })
        .then(audio => {
          res.json(audio);
        });
    })
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};

exports.RetrieveAudioByName = (req, res) => {
  Audio.findOne({
    where: {
      name: req.params.name
    },
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ]
  })
    .then(audio => {
      if (audio) { res.json(audio) }
      else {
        res.status(404).json({ nopostfound: 'No audio found with that Name' })
      }
    }
    )
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};
exports.RetrieveAudioById = (req, res) => {
  Audio.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ],
    raw: true
  })
    .then(audio => {
      if (audio) { res.json(audio) }
      else {
        res.status(404).json({ nopostfound: 'No audio found with that ID' })
      }
    }
    )
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};

exports.RetrieveAudioByAlbumID = (req, res) => {
  Audio.findAll({
    where: {
      albumId: req.params.albumId
    },
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ]
  })
    .then(audio => res.json(audio))
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};

exports.RetrieveAudioByArtistID = (req, res) => {
  Audio.findAll({
    where: {
      artistId: req.params.artistId
    },
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ]

  })
    .then(audio => res.json(audio))
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};

exports.DeleteAudio = (req, res) => {
  Audio.findOne({
    where: {
      id: req.params.id
    }
  }).then(audio => {
    if (audio !== null) {
      audio
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
        noaudio: 'No audio found'
      });
    }
  });
};

exports.UndoSoftdelAudio = (req, res) => {
  Audio.findOne({
    where: {
      id: req.params.id
    },
    paranoid: false
  }).then(audio => {
    if (audio !== null) {
      audio.restore();
      res.json(audio);
    } else {
      res.status(404).json({
        noaudiofound: 'audio not found'
      });
    }
  });
};

//new for testing

exports.UploadAudio2 = (req, res) => {
  const { errors, isValid } = validateAudioInput(req.file);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Audio.create({
    album_id: req.params.album_id,
    audio_id: req.file.audio_id,
    audio: req.file.url,
    name: req.body.name
  })
    .then(audio => res.json(audio))
    .catch(err => console.log(err));
};

exports.RetrieveAllAudio2 = (req, res) => {
  Audio.findAll({
    raw: true,
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ]
  })
    .then(audio => res.json(audio))
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};


exports.LikeUnlikeAudio = (req, res) => {

  User.findOne({ where: { id: req.user.id } }).then(user => {
    // AudioLikes.findAll({ where: { audioId: req.params.id } }).then(likes => {
    //   if (isEmpty(likes) !== true) {
    //     if (likes.filter(like => like.userId === req.user.id).length > 0
    //     ) {
    //       AudioLikes.findOne({ where: { userId: req.user.id } }).then(like => {
    //         like.destroy().then(() => {
    //           res.json({
    //             err: "unlike successful"
    //           })
    //         })
    //       })
    //     }
    //     AudioLikes.create({
    //       audioId: req.params.id,
    //       userId: user.id

    //     })
    //       .then(audio => res.json({
    //         err: "like successful"
    //       }))
    //       .catch(err => {
    //         res.json({
    //           err: "Something went wrong"
    //         })
    //       });


    //   } else {
    //     AudioLikes.create({
    //       audioId: req.params.id,
    //       userId: user.id

    //     })
    //       .then(audio => res.json({
    //         err: "like successful"
    //       }))
    //       .catch(err => {
    //         res.json({
    //           err: "Something went wrong"
    //         })
    //       });

    //   }


    // })

    AudioLikes.findOne({ where: { userId: req.user.id } }).then(like => {
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
        AudioLikes.create({
          audioId: req.params.id,
          userId: user.id

        })
          .then(audio => res.json({
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


exports.UnLikeAudio = (req, res) => {

  User.findOne({ where: { id: req.user.id } }).then(user => {
    AudioLikes.findAll({ where: { audioId: req.params.id } }).then(likes => {
      if (isEmpty(likes) !== true) {
        if (likes.filter(like => like.userId === req.user.id).length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this post' });
        } else {
          AudioLikes.findOne({ where: { userId: req.user.id } }).then(like => {
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
exports.getLikes = (req, res) => {

  AudioLikes.findAll({ where: { audioId: req.params.id } }).then(likes => { res.json(likes) }).catch(err => {
    res.json({
      err: "Something went wrong"
    })
  });


}

exports.getComment = (req, res) => {

  AudioComment.findAll({ where: { audioId: req.params.id } }).then(comment => { res.json(comment) }).catch(err => {
    res.json({
      err: "Something went wrong"
    })
  });


}

exports.AddAudioComment = (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  AudioComment.create({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    userId: req.user.id,
    audioId: req.params.id,
    audioCatId: req.body.audioCatId

  }).then(comment => res.json(comment)).catch(err => res.status(404).json({ audionotfound: 'No audio found' }));

}

exports.DeleteAudioComment = (req, res) => {
  AudioComment.findOne({ where: { id: params.id } }).then(comment => {
    comment.destroy().then(() => {
      res.json({
        success: true
      })
    })
  })
}

exports.RetrieveAudioByAudioCatID = (req, res) => {
  Audio.findAll({
    where: {
      audioCatId: req.params.audioCatId
    },
    include: [
      {
        model: Album,
        required: false
      },
      {
        model: Artist,
        required: false
      },
      {
        model: AudioCat,
        required: false
      }
    ]
  })
    .then(audio => res.json(audio))
    .catch(err =>
      res.status(404).json({
        noaudiofound: 'No audio found'
      })
    );
};