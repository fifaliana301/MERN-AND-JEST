const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Nodedb')
   .then(()=> console.log('Connected to MongoDB'))
   .catch(err => console.error('Could not connect to MongoDB', err));


// schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags:  {
        type: Array,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'A course should have at least  on tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: () => {
            return this.isPublished;
        },
        min: 10,
        max: 200
    }
})

// Model
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name :'Node.js Course',
        category: 'web',
        author: 'Mosh',
        tags: [],
        isPublished: true,
        price: 15
    
    });

    try {
        course.validate();
       // const result = await course.save();
    }

    catch (ex) {
        console.log(ex.message);
    }
    
 
}



// query document
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
  
    const courses = await Course
       .find({author: 'Mosh'} , {isPublished: true})
       .skip((pageNumber - 1) * pageSize)
       .limit(pageSize)
       .sort({name: 1})
       .select({name: 1 , tags: 1})
    console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
        author: 'Jack', 
        isPublished: true
    }
  }, {new : true });
    
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({_id: id}) ;
   //const result = await Course.findByIdAndRemove(id) ; // return null
   console.log(result);
}


createCourse();

// removeCourse('5a68fdd7bee8ea64649c2777');
// updateCourse('5a68fdc3615eda645bc6bdec');

// getCourses();



