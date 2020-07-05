let express = require("express");
let app = express(); 
let mongoose = require("mongoose"); // mongoose db
let Genre = require("./genreschema");// exported schema file 
let Movie  = require("./movieschema");// exported schema file


let Joi = require("@hapi/joi");

let port = 5000 ; // localhost port

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/moviecollection", {
useNewUrlParser: true,
useUnifiedTopology:true,
})
.then(() => console.log("Connected to db"))
.catch((error) => console.log('something went wrong ${error.message}'));


/// create genre
app.post("/genre", async (req, res) => {
let {error} = genreValidationError(req.body);
if(error){
    return res.send(error.details[0].message)
};
let genre = new Genre.Genre({
    name:req.body.name
});
let result = await genre.save();
res.send(result);
});

app.post("/movie", async(req,res) => {
let { error } = movieValidationError(req.body);
if(error){
    return res.send(error.details[0].message)
};
let genredetails = await Genre.Genre.findById(req.body.genreId);
if(!genredetails){
    return res.status(403).send({message : "Invalid Id"})
};
let result = new Movie({
    name: req.body.name,
    actor:req.body.actor,
    price:req.body.price,
    genre:{
        name: genredetails.name,
    },
    stock:req.body.stock,
});
let data = await result.save();
res.send(data);
});


function genreValidationError(error){
    let schema = Joi.object({
        name:Joi.string().min(4).max(100).required()
    });
    return schema.validate(error);
}
    
function movieValidationError(error){
    let schema = Joi.object({
                name: Joi.string().min(4).max(100).required(),
                actor:Joi.string().min(4).max(100).required(),
                price:Joi.number().required(),
                genreId: Joi.string().required(),
                stock:Joi.number().required()
    });
    return schema.validate(error);
}


app.listen(port, () => console.log(`port working on ${port}`));

