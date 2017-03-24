const Event=require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit,
    deleteEvent: deleteEvent
};

    /**
     *
     * show all events
     */

    function showEvents(req, res) {
    // get all events
     Event.find({},(err, events) => {
         if(err)
         {
             res.status(404);
             res.send("ERROR");
         }

         // return a view with data
         res.render('pages/events', {
             events: events,
             success: req.flash('success')
         });
     });


  }

/**
 * Show a single event
 */
function showSingle(req, res) {
    // get a single event
    Event.findOne({ name : req.params.name}, (err, event) => {
        if(err)
        {
            res.status(400);
            res.send("Error")
        }

        res.render('pages/single', {
            event: event,
            success: req.flash('success')
        });
    });


  }



/**
 * Seed the database
 */
function seedEvents(req, res) {

        const events = [
            { name: 'Basketball', description: 'Throwing into a basket.',place:'banglore',date:'12/2/2017' },
            { name: 'Swimming',  description: 'Michael Phelps is the fast fish.',place:'banglore',date:'12/2/2017' },
            { name: 'Weightlifting', description: 'Lifting heavy things up' ,place:'banglore',date:'12/2/2017'}
        ];

        for(event of events) {
           var eve = new Event(event);
           eve.save();
        }
        res.send('database seeded');

    }

/**
 * show the created form
 */
function showCreate(req,res) {
    res.render('pages/create',{
        errors:req.flash('errors')
    });
}

/**
 * process the form
 */
function processCreate(req,res) {

    //validate information
    req.checkBody('Name','Name is Required.').notEmpty();
    req.checkBody('Description','Description is Required.').notEmpty();
    req.checkBody('Place','Place is Required.').notEmpty();
    req.checkBody('Date','Date is Required.').notEmpty();
    req.checkBody('Url','URL is Required.').notEmpty();
    
    //if there are errors. catch
    const errors=req.validationErrors();
    if(errors)
    {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create');
    }

    const event=new Event({
        name:req.body.Name,
        description:req.body.Description,
        place:req.body.Place,
        date:req.body.Datee,
        url:req.body.Url
    });

    //save
    event.save((err) => {

        if(err)
          return err;

        //set a successful flash message
        req.flash('success','Successfully created Event!');

        res.redirect(`/events/${event.name}`);

    });
}

/**
 * Show the edit form
 */
function showEdit(req, res) {
    Event.findOne({ name: req.params.name }, (err, event) => {
        res.render('pages/edit', {
            event: event,
            errors: req.flash('errors')
        });
    });
}

/**
 * Process the edit form
 */
function processEdit(req, res) {
    // validate information
    req.checkBody('Name','Name is Required.').notEmpty();
    req.checkBody('Description','Description is Required.').notEmpty();
    req.checkBody('Place','Place is Required.').notEmpty();
    req.checkBody('Date','Date is Required.').notEmpty();
    req.checkBody('Url','URL is Required.').notEmpty();
    

    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/events/${req.params.name}/edit`);
    }

    // finding a current event
    Event.findOne({ name: req.params.name }, (err, event) => {
        // updating that event
        event.name        = req.body.Name;
        event.description = req.body.Description;
        event.place = req.body.Place;
        event.date = req.body.Date;
        event.url = req.body.Url;

        event.save((err) => {
            if (err)
                throw err;

            // success flash message
            // redirect back to the /events
            req.flash('success', 'Successfully updated event.');
            res.redirect('/events');
        });
    });

}

function deleteEvent(req, res) {
    Event.remove({ name: req.params.name }, (err) => {
        // set flash data
        // redirect back to the events page
        req.flash('success', 'Event deleted!');
        res.redirect('/events');
    });
}

