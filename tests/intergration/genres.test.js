const { after, iteratee } = require('lodash');
const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
const mongoose = require('mongoose');

let server;

// describe('/api/genres', () => {
//     beforeEach(() => {
//         serve = require('../../index');
//     });
//     afterEach(() => {
//        serve.close();
//     });

//     describe('GET /', () => {
//         it('should return all genres', async () => {
//             const res = await request(serve).get('/api/genres');
//             expect(res.status).toBe(200);
//         })
//     })
// })


describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
      server.close(); 
      await Genre.remove({});
    });
  
     //5. Populating the Test DB
    describe('GET /', () => {
      it('should return all genres', async () => {
        const genres = [
          { name: 'genre1' },
          { name: 'genre2' },
        ];
        
        await Genre.collection.insertMany(genres);
  
        const res = await request(server).get('/api/genres');
        
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
        expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
      });
    });

    // 6. Testing Routes with Parameters
    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
          const genre = new Genre({ name: 'genre1' });
          await genre.save();
    
          const res = await request(server).get('/api/genres/' + genre._id);
    
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('name', genre.name);     
        });
    });
    
}); 


