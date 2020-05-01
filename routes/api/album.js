const express = require('express');
const router = express.Router();
const AlbumController = require('../../controllers/AlbumController');
const parser = require('../../util/cloudinaryImageUpload');

// @route   album api/album/create
// @desc    Create album
// @access  Public
router.post('/create', parser.single('art'), AlbumController.CreateAlbum);

// @route   album api/album/retrive/:id
// @desc     return album 
// @access  Public
router.get('/retrieve/id/:id', AlbumController.RetrieveAlbumById);

// @route   album api/album/retrive/:id
// @desc    return album with album by id
// @access  Public
router.get('/retrieve2/id/:id', AlbumController.RetrieveAlbumById2);


// @route   Post api/album/retrieve/artist/:id
// @desc    Retrive  all album by artistId
// @access  Public
router.get('/retrieve/artist/:artistId',
    AlbumController.RetrieveAlbumByArtistID);

// @route   album api/album/retrive/:name
// @desc    return album with album by name
// @access  Public
router.get('/retrieve2/name/:name', AlbumController.RetrieveAlbumByName2);

// @route   album api/album/retrive
// @desc    Retrive all albums
// @access  Public
router.get('/retrieve', AlbumController.RetrieveAllAlbum);


// @route   album api/album/retrive2
// @desc    Retrive all albums
// @access  Public
router.get('/retrieve2', AlbumController.RetrieveAllAlbum2);


// @route   Post api/album/delete/:id
// @desc    Soft delete album by id
// @access  Public
router.delete('/delete/:id', AlbumController.DeleteAlbum);

module.exports = router;
