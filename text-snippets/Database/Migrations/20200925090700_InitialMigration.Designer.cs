﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using guepardoapps.text_snippets.Database;

namespace guepardoapps.text_snippets.Database.Migrations
{
    [DbContext(typeof(MainDbContext))]
    [Migration("20200925090700_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("guepardoapps.text_snippets.Database.Models.TextSnippet", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("DateTimeAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime?>("DateTimeUpdated")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4")
                        .HasMaxLength(2048);

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.ToTable("TextSnippets");

                    b.HasData(
                        new
                        {
                            Id = new Guid("b611df78-e267-4f6f-885e-c2b0a7947116"),
                            DateTimeAdded = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Value = "This is an example snippet"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
