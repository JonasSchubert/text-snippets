using System.Linq;
using guepardoapps.text_snippets.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using guepardoapps.text_snippets.Database.Extensions;
using System.Reflection;

namespace guepardoapps.text_snippets.Database
{
    public class MainDbContext : DbContext, IDbContext, IDbMigration
    {
        private readonly IConfiguration _configuration;

        private readonly string _defaultDateTimeAddValueSql = "CURRENT_TIMESTAMP";

        public MainDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public MainDbContext(DbContextOptions<MainDbContext> options)
            : base(options)
        {
        }

        public new DbSet<T> Set<T>() where T : Entity => base.Set<T>();

        public override int SaveChanges() => base.SaveChanges();

        public void Rollback()
        {
            ChangeTracker.Entries().ToList().ForEach(entry =>
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.CurrentValues.SetValues(entry.OriginalValues);
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            });
        }

        public void Migrate()
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            if (!dbContextOptionsBuilder.IsConfigured)
            {
                dbContextOptionsBuilder.UseMySql(
                    _configuration.GetConnectionString("MariaDbConnectionString"),
                    mySqlOptions =>
                    {
                        mySqlOptions.ServerVersion(new Version(20, 9, 25, 0), ServerType.MariaDb);
                    });
                dbContextOptionsBuilder.EnableSensitiveDataLogging();
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnTextSnippetsCreating(modelBuilder);

            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyInitializationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void OnTextSnippetsCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TextSnippet>().ToTable($"{nameof(TextSnippet)}s");

            modelBuilder.Entity<TextSnippet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Id);
                entity.Property(e => e.DateTimeAdded).HasDefaultValueSql(_defaultDateTimeAddValueSql);
            });
        }
    }
}
