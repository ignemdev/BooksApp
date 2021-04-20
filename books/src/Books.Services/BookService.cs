using Books.Core.Models;
using Books.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Books.Services
{
    public class BookService : IBookService
    {
        public Task<IEnumerable<Book>> GetBooks()
        {
            throw new NotImplementedException();
        }

        public Task<Book> CreateBook(Book book)
        {
            throw new NotImplementedException();
        }

        public Task<Book> GetBookById(int id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteBook(Book book)
        {
            throw new NotImplementedException();
        }

        public Task UpdateBook(Book book)
        {
            throw new NotImplementedException();
        }
    }
}
