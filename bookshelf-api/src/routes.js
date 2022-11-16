/* eslint linebreak-style: ["error", "windows"] */
const {
  addBooksHandler,
  getAllBooksHandler,
  detailBookHandler,
} = require('./handler');

const routes = [

  // input books data path
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },

  // get all books data path
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },

  // detail from book path
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: detailBookHandler,
  },

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
