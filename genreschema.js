let mongoose = require("mongoose");

let genreSchema = mongoose.Schema({
    name: {
        type: String, 
        min:4, 
        max:100, 
        trim:true, 
        required:true
    }
});

let Genre = mongoose.model("genres", genreSchema);

module.exports = {genreSchema, Genre};
