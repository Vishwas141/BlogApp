const express = require("express");
const app = express();
const dbConnect = require("./Database/db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fileUpload=require("express-fileupload");
const cloudinary=require("cloudinary").v2;
const {cloudinaryConnect}=require("./Database/cloudinaryConnect");
const Post=require("./models/Post")


const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(cors({
  credentials:true,
  origin:"http://localhost:3000"
}));

cloudinaryConnect()
dbConnect();

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;


  const user = await User.findOne({ username });


  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Credentials Not Found",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    try {
      const token = await jwt.sign({ username, id: user._id }, "Vishwas", {
        expiresIn: "24h",
      });

      return res.cookie("token", token).status(200).json({
        success: true,
        data:
        {
          id:user._id,
          username:user.username
        }
        
      });
    } catch (err) {
      console.log(err.message);
    }
   
  }

  return res.status(404).json({
    success: false,
    message: "Password not matched",
  });
});


app.post("/profile",async(req,res)=>
{

  
 const token=req.body.token;
  try
  {
    const data=jwt.verify(token,"Vishwas");
 
    return res.status(200).json({
      success:true,
      data
    })
  }
  catch(err)
  {
     return res.status(404).json(
      {
        message:err.message
      }
     )
  }
  

  //  console.log("token",token);
   return res.status(200).json({

    
   
   })

})

async function uploadFileToCloudinary(file, folder,quality) {
  const options = {folder};
  console.log("temp file path", file.tempFilePath);

options.resource_type="auto"

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

app.post("/logout",async(req,res)=>
{
  return res.cookie("token",' ').json({
    message:"user succesfully logout"
  })
})


app.post("/post",async(req,res)=>
{
  try
  {
    const file = req.files.file;
    console.log(file);
    const response = await uploadFileToCloudinary(file, "vishwas");
    console.log(response);

    const {title,summary,content}=req.body;

    try
    {
      var data=jwt.verify(req.cookies.token,"Vishwas");
    }
    catch(err)
    {
       return res.status(404).json(
        {
          message:err.message
        }
       )
    }
    
  

    const post=await Post.create({
      title,summary,content,
      cover:response.secure_url,
      author:data.id
    })




    // create post
    return res.status(200).json({
      success:true,
     post
    })

  }
  catch(err)
  {
    return res.status(200).json({
      success:false
    })

  }

})

app.get("/postdata",async(req,res)=>
{
  try
  {
     const resp=await Post.find({}).sort({createdAt:-1}).limit(20);
     


     return res.status(200).json({
      success:true,
      resp
      
     })
  }
  catch(err)
  {
    return res.status(400).json({
      message:"Error while fetching message",
      success:true,
      err:err.message
    })
  }

})

app.get("/post/:id",async (req,res)=>
{
  try
  {
     const data=await Post.findById(req.params.id);
     return res.status(200).json({
       success:true,
       data
     })
  }
  catch(err)
  {
    return res.status(400).json({
      success:false,
      msg:err.message


    })
  }
})

app.put("/post",async (req,res)=>{
  try
  {
    const file = req.files.file;
    console.log(file);
    const response = await uploadFileToCloudinary(file, "vishwas");
    console.log(response);

    const {title,summary,content}=req.body;

    try
    {
      var data=jwt.verify(req.cookies.token,"Vishwas");
    }
    catch(err)
    {
       return res.status(404).json(
        {
          message:err.message
        }
       )
    }

    const docs=await Post.findById(req.body.id);

    const updated=await Post.findByIdAndUpdate({_id:req.body.id},{
       title,
       summary,
       content,
       cover:response.secure_url

    })
    return res.status(200).json({
      updated
    })


  }catch(err)
  {
    return res.status(400).json({
      success:false,
      message:err.message
    })
  }
})

app.listen(4000, () => {
  console.log("server is listening on 4000");
});
