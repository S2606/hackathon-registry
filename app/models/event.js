/**
 * Created by shagun on 24/3/17.
 */
var mongoose=require('mongoose'),
    schema=mongoose.Schema;

//create a schema
var eventschema= new schema({

    name:{
        type:String,
        unique:true
    },
    description:{
        type:String,
        unique:true
    },
    place:String,
    date:String,
    url:String

});



//create a model
var eventmodel=mongoose.model('Event',eventschema);

//export the model
module.exports = eventmodel;