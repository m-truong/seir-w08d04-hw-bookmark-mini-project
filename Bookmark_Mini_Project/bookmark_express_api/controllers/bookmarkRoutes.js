// ===============
// ROUTER
// ===============
const express = require('express');
const bookmarkRoutes = express.Router();
const bookmarkModel = require('../models/bookmarkModel.js');

// ======================
// RESTFUL-ROUTES I-DUC-S: no NEW and EDIT routes
// ======================

// ===============
// INDEX: display a list of all resources
// ===============
bookmarkRoutes.get('/', async (req, res) => {
    try {
        const foundBookmarks = await bookmarkModel.find({});
        res.status(200).json(foundBookmarks);
    } catch (error) {
        res.status(400).json(error);
    } finally {
        console.log('check Postman to verify if it displayed all document-objects...');
    }
});

// ===============
// DELETE: destroy a resource
// ===============
bookmarkRoutes.delete('/:id', async (req, res) => {
    try {
        const deletedBookmark = await bookmarkModel.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedBookmark);
    } catch (error) {
        res.status(400).json(error);
    } finally {
        console.log('check Postman to verify if document-object has been deleted from collection...');
    }
});

// ===============
// UPDATE(Functional-route): update a resource
// ===============
bookmarkRoutes.put('/:id', async (req, res) => {
    try {
        const updatedBookmark = await bookmarkModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            // need this flag to replace the current object 
            { new: true }
        );
        res.status(200).json(updatedBookmark);
    } catch (error) {
        res.status(400).json(error);
    } finally {
        console.log('check Postman to verify it it updated document-object correctly... ');
    }
});

// ===============
// CREATE(Functional-route): create a NEW resource 
// ===============

bookmarkRoutes.post('/', async (req, res) => {
    try {
        const createdBookmark = await bookmarkModel.create(req.body);
        res.status(200).json(createdBookmark);
    } catch (error) {
        res.status(400).json(error);
    } finally {
        console.log('check Postman to verify if new document-object was successfully created...');
    }
});

// ===============
// SHOW(Presentational-route): DISPLAY an individual resource 
// ===============
bookmarkRoutes.get('/:id', async (req, res) => {
    try {
        const showBookmark = await bookmarkModel.findById(req.params.id);
        res.status(200).json(showBookmark);
    } catch (error) {
        res.status(400).json(error);
    } finally {
        console.log('check Postman to verify if single document-object was retrieved...');
    }
});

module.exports = bookmarkRoutes;