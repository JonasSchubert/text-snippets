using guepardoapps.text_snippets.Database.Factories;
using guepardoapps.text_snippets.Database.Models;
using guepardoapps.text_snippets.Database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace guepardoapps.text_snippets.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("text-snippets/api/v1/[controller]")]
    public class TextSnippetsController : BaseController<TextSnippet, TextSnippetsController, ITextSnippetRepository, ITextSnippetFactory>
    {
        public TextSnippetsController(ILogger<TextSnippetsController> logger, ITextSnippetRepository repository, ITextSnippetFactory factory)
            : base(logger, repository, factory)
        { }
    }
}
