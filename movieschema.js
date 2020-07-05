let mongoose = require("mongoose");
let G = require("./genreschema");
let movieSchema = mongoose.Schema(
    {
        name : {type: String, min: 4,max:100,  required:true},
        actor : {type: String, min:4, max:100, required:true},
        price : {type: Number, required:true},       
        genre: G.genreSchema,
        stock: {type:Number, required:true}

    });

let Movie = mongoose.model("movies", movieSchema); 
   
module.exports = Movie;