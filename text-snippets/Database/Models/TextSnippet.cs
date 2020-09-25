using System.ComponentModel.DataAnnotations;

namespace guepardoapps.text_snippets.Database.Models
{
    public class TextSnippet : Entity
    {
        [Required]
        [MaxLength(128)]
        public string Description { get; set; }

        [Required]
        [MaxLength(32)]
        public string Tag { get; set; }

        [Required]
        [MaxLength(2048)]
        public string Value { get; set; }
    }
}
