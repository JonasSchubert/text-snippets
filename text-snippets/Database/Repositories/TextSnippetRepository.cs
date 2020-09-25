using guepardoapps.text_snippets.Database.Models;

namespace guepardoapps.text_snippets.Database.Repositories
{
    public class TextSnippetRepository : BaseRepository<TextSnippet>, ITextSnippetRepository
    {
        public TextSnippetRepository(IDbContext dbContext) : base(dbContext)
        {
        }
    }
}
