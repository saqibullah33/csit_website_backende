const Society=require('../Model/Society.model')
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.Society_update = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const new_post = new Society({
      title,
    description,
      image: result.secure_url
    });

    await new_post.save();
    console.log({
      imageurl: result.secure_url,
      title,
      description,
      status: 'success'
    });

    res.status(200).send({
      imageurl: result.secure_url,
      title,
      description,
      status: 'success'
    });
  } catch (err) {
    res.status(400);
    res.send({
      status: 'failed',
      message: err.message
    });
  }
};



exports.fetchSocietyPost=async(req,res)=>{
    try{
        const Society_post=await Society.find().sort({createdAt:-1}).limit(1)
        res.status(200).send(Society_post)
    }catch(err){
        res.status(400)
        res.send({
            status:'failed',
            message:err.message
        })
    }
}
