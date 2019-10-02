
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  or
  https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
 
  /* Then save the listing */
  listing.save(function(err, doc) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      console.log(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var listing = req.listing;
  
  //identify the contact to be updated


  //Check for an error
 
  
  //Update the listing info
          listing.code = req.body.code;
          listing.name = req.body.name;
          listing.address = req.body.address;
  
  // save the contact and check for errors
          listing.save(function (err) {
              if (err)
                    res.status(400).send(err);
            else{
              res.json(listing);
            }
          });

  // if(req.results) {
  //   listing.coordinates = {
  //     latitude: req.results.lat, 
  //     longitude: req.results.lng
  //   };
  // }
  // /* Save the listing */
  // listing.save(function(err) {
  //   if(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   } else {
  //     res.json(listing);
  //     console.log(listing)
  //   }
  // });
};
      /* Replace the listings's properties with the new properties found in req.body */
  
  /*save the coordinates (located in req.results if there is an address property) */
 
  

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;
  

    //Check for an error
          
    
    //Update the listing info
            listing.code = req.body.code;
            listing.name = req.body.name;
            listing.address = req.body.address;
    
    // save the contact and check for errors
    listing.remove(function (err) {
      if (err)
            res.status(400).send(err);
    else{
      res.end();
    }
  });
  

    // if(req.results) {
    //   listing.coordinates = {
    //     latitude: req.results.lat, 
    //     longitude: req.results.lng
    //   };
    // }
    // /* Save the listing */
    // listing.save(function(err) {
    //   if(err) {
    //     console.log(err);
    //     res.status(400).send(err);
    //   } else {
    //     res.json(listing);
    //     console.log(listing)
    //   }
    // });
  /* Add your code to remove the listins */

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
Listing.find().sort('code').exec(function(err,data){
    if (err)
          res.status(400).send(err);
  else{
    res.json(data);
  }


  /* Add your code */
}
  //not sure how to use express in a way to do the hint.
)};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};





//    // Validate Request
  //    if(!req.body.content) {
  //     return res.status(400).send({
  //         message: "Listing content can not be empty"
  //     });
  // }

  // // Find note and update it with the request body
  // listing.findByIdAndUpdate(req.params.listing, {
  //     code: req.body.code, 
  //     name: req.body.name, 
  //     address: req.body.address
      
  // }, {new: true})
  // .then(listing => {
  //     if(!listing) {
  //         return res.status(404).send({
  //             message: "Note not found with id " + req.params.noteId
  //         });
  //     }
  //     res.send(listing);
  // }).catch(err => {
  //     if(err.kind === 'ObjectId') {
  //         return res.status(404).send({
  //             message: "Note not found with id " + req.params.listing
  //         });                
  //     }
  //     return res.status(500).send({
  //         message: "Error updating note with id " + req.params.listing
  //     });
  // });