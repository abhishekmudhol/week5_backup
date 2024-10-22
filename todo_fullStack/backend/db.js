const  mongoose  = require("mongoose");

mongoose.connect(`mongodb+srv://abhishekmudhol:u8x5d1WRYOKzdhUs@clusterlearning.6jhaqdc.mongodb.net/todo_app`)

mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');
}).on('error', (error) => {
    console.log('Error connecting to MongoDB:', error);
});

const todoSchema = new mongoose.Schema({
    title : { type: String, required: true},
    description : {type : String , required : true},
    completed : {type : Boolean , required : true}
})

const todo =  mongoose.model('todo' , todoSchema)

module.exports = {
    todo
}