
var models = require('../models');
const Album = models.Album
const Audio = models.Audio
const Artist = models.Artist

exports.CreateAlbum = (req, res) => {
  Album.create(
    {
      albumName: req.body.albumName,
      art: req.file.url,
      artist: req.body.artist,
      artistId: req.body.artistId
    }
  )

    .then(album => res.status(201).send(album))
    .catch(err => res.status(400).send(err));
};

exports.RetrieveAlbumById = (req, res) => {
  Album.findOne({
    where: {
      id: req.params.id
    },
    include: [

      {
        model: Artist,
        required: false
      }
    ]
  })
    .then(album => {
      if (!album) {
        return res.status(404).json({
          novideofound: 'No album found'
        });
      }
      return res.status(200).json(album);
    })
    .catch(err => res.status(404).json(err));
};

exports.RetrieveAlbumById2 = (req, res) => {
  Album.findOne({
    where: {
      id: req.params.id
    },
    include: [

      {
        model: Artist,
        required: false
      },
      {
        model: Audio,
        as: 'songs',

      }
    ]
  })
    .then(album => {
      if (!album) {
        return res.status(404).json({
          novideofound: 'No album found'
        });
      }
      return res.status(200).json(album);
    })
    .catch(err => res.status(404).json(err));
};


exports.RetrieveAlbumByName = (req, res) => {
  Album.findOne({
    where: {
      name: req.params.name
    }
  })
    .then(album => {
      if (!album) {
        return res.status(404).json({
          novideofound: 'No album found'
        });
      }
      return res.status(200).json(album);
    })
    .catch(err => res.status(404).json(err));
};

exports.RetrieveAlbumByArtistID = (req, res) => {
  Album.findAll({
    where: {
      artistId: req.params.artistId
    }
  })
    .then(album => res.json(album))
    .catch(err =>
      res.status(404).json({
        noalbumfound: 'No album found'
      })
    );
};

exports.RetrieveAlbumByName2 = (req, res) => {
  Album.findOne({
    where: {
      name: req.params.name
    },
    include: [
      {
        model: Artist,
        required: false
      },
      {
        model: Audio,
        as: 'songs'
      }
    ]

  })
    .then(album => {
      if (!album) {
        return res.status(404).json({
          novideofound: 'No album found'
        });
      }
      return res.status(200).json(album);
    })
    .catch(err => res.status(404).json(err));
};

exports.RetrieveAllAlbum = (req, res) => {
  Album.findAll({
    raw: true,
    include: [
      {
        model: Artist,
        required: false
      }

    ]

  })
    .then(album => res.json(album))
    // .catch(err => res.status(404).json(err));
    .catch(console.error)
};

exports.RetrieveAllAlbum2 = (req, res) => {
  Album.findAll({
    raw: true,
    include: [
      {
        model: Artist,
        required: false
      },
      {
        model: Audio,
        as: 'songs',

      }

    ]

  })
    .then(album => res.json(album))
    // .catch(err => res.status(404).json(err));
    .catch(console.error)
};

exports.DeleteAlbum = (req, res) => {
  Album.findOne({
    where: {
      id: req.params.id
    }
  }).then(album => {
    if (album !== null) {
      album
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
        noalbum: 'No audio found'
      });
    }
  });
};