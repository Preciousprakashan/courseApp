const mongoose = require('mongoose');

//creating schema
const courseSchema = new mongoose.Schema({
    courseId: String,
    courseImage: String,
    courseName: String,
    courseDescription: String,
    courseDuration: Number
  }, { versionKey: false });
  


//mapping collection
const  courseData=mongoose.model('course',courseSchema);

//exporting schema
module.exports=courseData;