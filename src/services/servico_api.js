const livros = require('../data/books.json');
const categorias = require('../data/categories.json');

const servicoApi = {
  get: (path) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (path === '/books') resolve({ data: livros });
        else if (path === '/categories') resolve({ data: categorias });
        else resolve({ data: null });
      }, 250);
    });
  }
};

export default servicoApi;
