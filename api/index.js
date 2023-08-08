const express = require("express");
const app = express();
const dbConnect = require("./Database/db");
const User = require("./models/User");

const cors = require("cors");

app.use(express.json());

app.use(cors());
dbConnect();

app.post("/register", async (req, res) => 
{
    try
    {
        const { username, password } = req.body;

        const user = await User.create({
          username,
          password,
        });
        return res.status(200).json({
            user
        })
    }catch(err)
    {
      return res.status(400).json(err.message);
    }
  

  res.json(user);
});

app.listen(4000, () => {
  console.log("server is listening on 4000");
});
