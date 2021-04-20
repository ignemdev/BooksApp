﻿using Books.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Books.Core.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBookById(int id);
        Task<Book> CreateBook(Book book);
        Task UpdateBook(Book book);
        Task DeleteBook(Book book);
    }
}
