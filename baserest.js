const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'coures1' },
    { id: 2, name: 'coures2' },
    { id: 3, name: 'coures3' }
]

app.get('/', (req, res) => {
    res.send('Hello')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given');
    res.send(course);
});


app.post('/api/courses/', (req, res) => {
    const { error } = validateCours(req.body);
    if (result.error) {
        // 400 Bad Request
        return res.status(400).send(result.error.details[0].message);

    }

    const result = Joi.validate(req.body, schema);
    if (result.error) {

        return res.status(400).send(result.error.details[0].message);

    }

    const course = {
        id: courses.length + 1,
        mane: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given');

    //Validate
    // If invalid , return 400 -Bad request
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = validateCours(req.body);
    const { error } = validateCours(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);

    }

    // Update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);


});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listeng Port 3000'))