const request = require('supertest');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const stream = require('stream');
const upload = multer();

it('multipart form post test', async () => {
  const app = express();
  let file;
  app.post('/', upload.single('avatar'), (req, res) => {
     file = req.file;
     
     res.status(201).send('Okie');
  });

  const response = await request(app)
    .post('/')
    .field('name', 'Joe')
    .attach('avatar', './tests/fixtures/example.png')
  ;

  expect(response.text).toBe('Okie');
  expect(response.status).toBe(201);
  expect(file).toBeDefined();
  expect(file.originalname).toBe('example.png');
  expect(file.mimetype).toBe('image/png');
  const bufferStream = new stream.PassThrough();
 
  bufferStream.end(file.buffer);
  bufferStream.pipe(process.stdout);
 
  console.log({file})
});
