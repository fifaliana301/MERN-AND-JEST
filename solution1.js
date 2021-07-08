const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises');

// schema

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: [String],
    isPublished : Boolean,
    price: Number
});

// model 

const Course = mongoose.model('Course', courseSchema);

async function getCourse() {
   return await Course
  .find({isPublished: true , tags: 'backend'})
  .sort({name : 1})
  .select({name: 1, author:1});
  
}

async function run() {
    const courses  = await getCourse();
    console.log(courses);
}


run();