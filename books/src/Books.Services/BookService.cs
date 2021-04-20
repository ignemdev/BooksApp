using Books.Core.Models;
using Books.Core.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Books.Services
{
    public class BookService : IBookService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly HttpClient _client;

        public BookService(IHttpClientFactory clientFactory){
            _clientFactory = clientFactory;
            _client = _clientFactory.CreateClient("fakeApi");
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var response = await _client.GetAsync("Books");

            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var books = JsonConvert.DeserializeObject<IEnumerable<Book>>(jsonString);
            return books;
        }

        public async Task<Book> CreateBook(Book newBook)
        {
            var httpContent = new StringContent(JsonConvert.SerializeObject(newBook), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("Books", httpContent);

            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var book = JsonConvert.DeserializeObject<Book>(jsonString);
            return book;
        }

        public async Task<Book> GetBookById(int id)
        {
            var response = await _client.GetAsync($"Books/{id}");

            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var book = JsonConvert.DeserializeObject<Book>(jsonString);
            return book;
        }

        public async Task<Book> UpdateBook(int id, Book book)
        {
            var httpContent = new StringContent(JsonConvert.SerializeObject(book), Encoding.UTF8, "application/json");
            var response = await _client.PutAsync($"Books/{id}", httpContent);

            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var updatedBook = JsonConvert.DeserializeObject<Book>(jsonString);
            return updatedBook;
        }

        public async Task DeleteBook(int id)
        {
            var response = await _client.DeleteAsync($"Books/{id}");
            response.EnsureSuccessStatusCode();
        }
    }
}
