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
        // if (true) {
        //     throw new Error("You shall not pass")
        // }
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
            // takes the id from the URL 
            req.params.id,
            // uses the .body of PostMan
            // seems like it destructures entire original object and makes a copy of it
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
    //the code in the try block will run if it error the catch block runs
    try {
        //using await the createdBookmark will be assigned when the promise resolves
        const createdBookmark = await bookmarkModel.create(req.body);
        //status sets the status code then sends a json response
        res.status(200).json(createdBookmark);
        // try
        // implicitly has a 'throw' keyword with (new) Error-object
    } catch (error) {
        // sets the status code and returns the error as json
        // type any status ### but needs to be ~400
        res.status(400).json(error);
        // 'always' executes
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