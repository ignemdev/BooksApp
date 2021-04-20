using Books.Core.Models;
using Books.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Books.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService) => _bookService = bookService;
        
        [HttpGet("")]
        [ProducesResponseType(typeof(List<Book>), 200)]
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var books = await _bookService.GetBooks();

                return Ok(books);
            }
            catch (HttpRequestException ex)
            {
                return NotFound(new { message = "Books not found.", exception = ex.Message });
            }
        }

        [HttpPost("")]
        [ProducesResponseType(typeof(Book), 201)]
        public async Task<IActionResult> CreateBook([FromBody]Book book)
        {
            var newBook = await _bookService.CreateBook(book);
            return CreatedAtAction(nameof(CreateBook), newBook);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Book), 200)]
        public async Task<IActionResult> GetBookById(int id)
        {
            try
            {
                if(id == 0) return BadRequest(new { message = "Invalid Id."});

                var book = await _bookService.GetBookById(id);
                return Ok(book);
            }
            catch (HttpRequestException ex)
            {
                return NotFound(new { message = "Book not found.", exception = ex.Message});
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Book), 200)]
        public async Task<IActionResult> UpdateBook(int id, [FromBody]Book book)
        {
            if ((id == 0) || (id != book.Id)) return BadRequest(new { message = "Invalid Id." });

            var updatedBook = await _bookService.UpdateBook(id, book);

            return Ok(updatedBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (id == 0) return BadRequest(new { message = "Invalid Id." });

            await _bookService.DeleteBook(id);

            return Ok(new {message = "Book deleted succesfully."});
        }
    }
}
