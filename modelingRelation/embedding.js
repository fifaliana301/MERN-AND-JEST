const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/embedding')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//=== Premier Methode====
// async function updateAuthor(courseId) {
//   const course = await Course.findById(courseId);
//   course.author.name = 'ReactJS';
//   course.save();
// }

//=== Deuxieme Methode====
async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'NodeJS'
    }
  });
}

//add Author
async function AddAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();

}

// remove Author
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// Add type Array
// createCourse('Node Course', [
//   new Author({ name: 'NestJS' }),
//   new Author({ name: 'React Native' })
// ]);

//updateAuthor('60092eb449383f1a3b9c9e29');

//AddAuthor('60093cf913701721ee5501cb', new Author({ name: 'Python' }))
removeAuthor('60093cf913701721ee5501cb', '60093f1b0c308c2331b068bd')