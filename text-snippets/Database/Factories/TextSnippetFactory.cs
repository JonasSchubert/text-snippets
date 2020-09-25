using guepardoapps.text_snippets.Database.Models;

namespace guepardoapps.text_snippets.Database.Factories
{
    public class TextSnippetFactory : ITextSnippetFactory
    {
        public TextSnippet Map(TextSnippet textSnippet, TextSnippet originalTextSnippet)
        {
            if (textSnippet != null)
            {
                originalTextSnippet.Description = textSnippet.Description;
                originalTextSnippet.Tag = textSnippet.Tag;
                originalTextSnippet.Value = textSnippet.Value;
                return originalTextSnippet;
            }
            else
            {
                return originalTextSnippet;
            }
        }
    }
}
