using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Books.Utilities.Endpoints
{
    public static class FakeApi
    {
        private static readonly string _protocol = "https";
        private static readonly string _basePath = "fakerestapi.azurewebsites.net/api/v1";

        public static string BooksEndpoint { get { return $"{_protocol}://{_basePath}/Books/"; } }
    }
}
