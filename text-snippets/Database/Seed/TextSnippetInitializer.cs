using System;
using guepardoapps.text_snippets.Database.Models;

namespace guepardoapps.text_snippets.Database.Seed
{
    public class TextSnippetInitializer : InitializerBase
    {
        protected override void Seed()
        {
            AddEntity(new TextSnippet { Id = new Guid("b611df78-e267-4f6f-885e-c2b0a7947116"), Description = "Example", Tag = "prod", Value = "This is an example snippet" });
        }
    }
}
