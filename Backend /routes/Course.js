import express, { response } from "express"
import upload from "../middleware/multer.js"
import cloudinary from "../utils/cloudinary.js";
import { PrismaClient } from "@prisma/client";



const CourseRouter = express.Router()
const prisma = new PrismaClient();

CourseRouter.post('/upload-Course',  upload.single('file') , async(req,res) =>{
        try{
            let result;
            const { fileType } = req.body;
        
            // Determine resource type based on file type
            if (fileType === 'image') {
              result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image",
              });
            } else if (fileType === 'video') {
              result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "video",
              });
            } else if (fileType === 'pdf') {
              result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
                format : 'pdf'
              });
            } else {
              return res.status(400).json({ message: 'Invalid file type' });
            }

            

            const createdCourse = await prisma.course.create({
                data:{
                    Title: req.body.title,
                    Description : req.body.description,
                    Duration : req.body.duration,
                    FileUrl : result.secure_url,
                    FileType : req.body.fileType

                }
            })
            res.status(200).json({
                success : true,
                message: 'Course uploaded successfully',
                data : createdCourse
            })
        } catch(err) {
            console.log(err)
        }
} )

CourseRouter.get('/', async(req,res)=>{
    try{
        const response = await prisma.course.findMany({
            select:{
                Title : true,
                Id: true,
                Description : true,
                Duration : true,
                FileUrl : true,
                FileType : true
            }

        
        })
        res.json(response)
    }catch(err){
        console.log(err)
    }
    
   
} )

CourseRouter.get('/:id' , async(req,res) =>{
  try{
    const id = req.params.id
    const response = await prisma.course.findUnique({
      where  :{Id : id},
     

    })
    res.json(response)
  }
  catch(err){
    console.log(err)
  }
})

export default CourseRouter