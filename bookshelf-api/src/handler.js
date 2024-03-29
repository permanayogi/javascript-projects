/* eslint-disable eqeqeq */
/* eslint linebreak-style: ["error", "windows"] */
const { nanoid } = require('nanoid');
const books = require('./books');

// Handler for adding books
const addBooksHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished;

  // Check pageCount for assign finished value
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  // Check if name is not defined on body request
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Check if readPage bigger than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // If body request complete, push data to books
  books.push(newBooks);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Handler for get all books
const getAllBooksHandler = (request, h) => {
  // [Optional] declare variable from query parameter
  const { name, reading, finished } = request.query;
  let bookFilter = books;

  // [Optional] check if name is assigned, it should return array that include name from query
  if (name !== undefined) {
    bookFilter = books.filter((bf) => bf.name.toLowerCase().includes(name.toLowerCase()));
  }

  /* [Optional] check if reading is assigned in query, it should
  return array finished books when query value is 1, return array unfinished book
  when value is 0, return all books when if of them in query
  */
  if (reading !== undefined) {
    if (reading == 1) {
      bookFilter = books.filter((bf) => bf.reading == reading);
    } else if (reading == 0) {
      bookFilter = books.filter((bf) => bf.reading == reading);
    } else {
      bookFilter = books;
    }
  }

  /* [Optional] check if finished is assigned in query parameter, it should return
  an array of finished books when query is 1, unfinished books when query is 0,
  return all books data if none of them in query */
  if (finished !== undefined) {
    if (finished == 1) {
      bookFilter = books.filter((bf) => bf.finished == finished);
    } else if (finished == 0) {
      bookFilter = books.filter((bf) => bf.finished == finished);
    } else {
      bookFilter = books;
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: bookFilter.map((book) => (
        {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
    },
  });
  response.code(200);
  return response;
};

// Handler for detail book
const detailBookHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler for edit book
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);
  let finished;

  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler for delete book
const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler, getAllBooksHandler, detailBookHandler, editBookByIdHandler, deleteBookById,
};
