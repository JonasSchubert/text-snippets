using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace guepardoapps.text_snippets.Database.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TextSnippets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DateTimeAdded = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    DateTimeUpdated = table.Column<DateTime>(nullable: true),
                    Value = table.Column<string>(maxLength: 2048, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextSnippets", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "TextSnippets",
                columns: new[] { "Id", "DateTimeUpdated", "Value" },
                values: new object[] { new Guid("b611df78-e267-4f6f-885e-c2b0a7947116"), null, "This is an example snippet" });

            migrationBuilder.CreateIndex(
                name: "IX_TextSnippets_Id",
                table: "TextSnippets",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TextSnippets");
        }
    }
}
