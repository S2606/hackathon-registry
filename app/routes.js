// create a new express router
const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller'),
  eventsController = require('./controllers/events.controller');

// export router
module.exports = router;

// define routes
// main routes
router.get('/', mainController.showHome);

// event routes
router.get('/events',       eventsController.showEvents);

// create events
router.get('/events/create',       eventsController.showCreate);
router.post('/events/create',       eventsController.processCreate);


router.get('/events/seed',  eventsController.seedEvents);

// edit events
router.get('/events/:name/edit', eventsController.showEdit);
router.post('/events/:name', eventsController.processEdit);


// delete events
router.get('/events/:name/delete', eventsController.deleteEvent);

// show a single event
router.get('/events/:name', eventsController.showSingle);