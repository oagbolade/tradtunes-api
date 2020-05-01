var models = require('../models');
const Artist = models.Artist
const Audio = models.Audio
const Video = models.Video


exports.CreateArtist = (req, res) => {
  const newArtist = {
    stageName: req.body.stageName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    avatar: req.file.url
  };
  Artist.create(newArtist)
    .then(artist => res.json(artist))
    .catch(err => console.log(err));
};

exports.UploadPicture = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      user
        .update({
          avatar: req.file.url
        })
        .then(user => {
          res.json(user);
        });
    })
    .catch(err =>
      res.status(404).json({
        nouserfound: 'No user found'
      })
    );
};

exports.UpdateArtist = (req, res) => {
  Artist.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(artist => {
      artist
        .update({
          stageName: req.body.stageName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          sex: req.body.sex
        })
        .then(artist => {
          res.json(artist);
        });
    })
    .catch(err =>
      res.status(404).json({
        noartistfound: 'No artist found'
      })
    );
};

exports.RetrieveAllArtist = (req, res) => {
  Artist.findAll({
    raw: true
  })
    .then(artist => res.json(artist))
    .catch(err =>
      res.status(404).json({
        noartistfound: 'No artist found'
      })
    );
};

exports.RetrieveArtistByName = (req, res) => {
  Artist.findOne({
    where: {
      stageName: req.params.stageName
    }
  })
    .then(artist => res.json(artist))
    .catch(err =>
      res.status(404).json({
        noartistfound: 'No artist found'
      })
    );
};

exports.RetrieveArtistById = (req, res) => {
  Artist.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Audio,
        as: 'audios',

      },

      {
        model: Video,
        as: 'videos'

      },

    ]
  })
    .then(artist => res.json(artist))
    .catch(err =>
      res.status(404).json({
        noartistfound: 'No artist found'
      })
    );
};

exports.DeleteArtist = (req, res) => {
  Artist.findOne({
    where: {
      id: req.params.id
    }
  }).then(artist => {
    if (artist !== null) {
      artist
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
        noartist: 'No artist found'
      });
    }
  });
};

exports.UndoSoftdelArtist = (req, res) => {
  Artist.findOne({
    where: {
      id: req.params.id
    },
    paranoid: false
  }).then(artist => {
    if (artist !== null) {
      artist.restore();
      res.json({
        success: true
      });
    } else {
      res.status(404).json({
        noartistfound: 'artist not found'
      });
    }
  });
};


exports.RetrieveAllArtist2 = (req, res) => {
  Artist.findAll({
    raw: true,
    include: [
      {
        model: Audio,
        as: 'audios',

      },

      {
        model: Video,
        as: 'videos',

      },

    ]

  })
    .then(artist => res.json(artist))
    // .catch(err => res.status(404).json(err));
    .catch(console.error)
};
