/* eslint-disable no-undef */
const request = require('supertest');

describe('Unit testing the /signup route', function() {
  it('responds with 200', function(done) {
    request('https://deserie.students.nomoreparties.site/')
    .get('/signup')
    .set('Accept', 'application/json')
    .expect('Content-Type', "text/html")
    .expect(200, done);
  });
});

describe('Unit testing the /signin route', function() {
  it('responds with 200', function(done) {
    request('https://deserie.students.nomoreparties.site/')
    .get('/signin')
    .set('Accept', 'application/json')
    .expect('Content-Type', "text/html")
    .expect(200, done);
  });
});