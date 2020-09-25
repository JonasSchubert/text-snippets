using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace guepardoapps.text_snippets.Database.Migrations
{
    public partial class AddDescriptionAndTag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TextSnippets",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "TextSnippets",
                maxLength: 32,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "TextSnippets",
                keyColumn: "Id",
                keyValue: new Guid("b611df78-e267-4f6f-885e-c2b0a7947116"),
                columns: new[] { "Description", "Tag" },
                values: new object[] { "Example", "prod" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "TextSnippets");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "TextSnippets");
        }
    }
}
