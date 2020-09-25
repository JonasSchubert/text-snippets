using guepardoapps.text_snippets.Database.Seed;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Reflection;

namespace guepardoapps.text_snippets.Database.Extensions
{
    public static class InitializerExtensions
    {
        public static void ApplyInitializationsFromAssembly(this ModelBuilder modelBuilder, Assembly assembly)
        {
            var types = assembly
                .GetTypes()
                .Where(t => t.BaseType == typeof(InitializerBase))
                .ToList();

            types.ForEach(t => ((InitializerBase)Activator.CreateInstance(t)).Seed(modelBuilder));
        }
    }
}
