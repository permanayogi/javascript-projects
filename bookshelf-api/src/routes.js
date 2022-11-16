/* eslint linebreak-style: ["error", "windows"] */
const {
  addBooksHandler,
  getAllBooksHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // {
  //   method: 'POST',
  //   URL: '/books/{bookId}',
  //   handler: '',
  // },
  // {
  //   method: 'PUT',
  //   URL: '/books/{bookId}',
  //   handler: '',
  // },
  // {
  //   method: 'DELETE',
  //   URL: '/books/{bookId}',
  //   handler: '',
  // },
];

module.exports = routes;
