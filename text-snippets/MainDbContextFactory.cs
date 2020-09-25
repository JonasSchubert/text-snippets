using guepardoapps.text_snippets.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;

namespace guepardoapps.text_snippets
{
    [ExcludeFromCodeCoverage]
    public class MainDbContextFactory : IDesignTimeDbContextFactory<MainDbContext>
    {
        public MainDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json")
                .AddJsonFile("appsettings.Production.json")
                .Build();

            var dbOptionsBuilder = new DbContextOptionsBuilder<MainDbContext>().UseMySql(
                configuration.GetConnectionString("MariaDbConnectionString"),
                mySqlOptions =>
                {
                    mySqlOptions.ServerVersion(new Version(20, 9, 25, 0), ServerType.MariaDb);
                });

            return new MainDbContext(dbOptionsBuilder.Options);
        }
    }
}
