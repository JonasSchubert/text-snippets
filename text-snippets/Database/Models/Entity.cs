using System;
using System.ComponentModel.DataAnnotations;

namespace guepardoapps.text_snippets.Database.Models
{
  public abstract class Entity
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public DateTime DateTimeAdded { get; set; }

    public DateTime? DateTimeUpdated { get; set; }
  }
}
