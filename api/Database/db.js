const mongoose=require("mongoose");


const dbConnect=()=>
{
    mongoose.connect("mongodb://127.0.0.1:27017/myapp",
    {
        useNewUrlParser: true,

        useUnifiedTopology: true,
    }).then(()=>
    {
        console.log("db connection successful")
    }).catch((err)=>
    {
        console.log("db connection unsuccessful")
    })

}

module.exports=dbConnect;