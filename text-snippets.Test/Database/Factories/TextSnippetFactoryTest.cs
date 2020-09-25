using System.Collections.Generic;
using FluentAssertions;
using guepardoapps.text_snippets.Database.Factories;
using guepardoapps.text_snippets.Database.Models;
using Xunit;

namespace guepardoapps.text_snippets.Test.Database.Factories
{
    public class TextSnippetFactoryTest
    {
        public static readonly IEnumerable<object[]> MapSource = new[] {
            new object[] {
				// TODO
            },
            new object[] {
				// TODO
            },
            new object[] {
				// TODO
            }
        };

        private readonly ITextSnippetFactory _textSnippetFactory;

        public TextSnippetFactoryTest()
        {
            _textSnippetFactory = new TextSnippetFactory();
        }

        [Theory]
        [MemberData(nameof(MapSource))]
        public void Map_Should_Return_Expected(TextSnippet input, TextSnippet original, TextSnippet expected)
        {
            // Arrange & Act
            var actual = _textSnippetFactory.Map(input, original);

            // Assert
            actual.Should().BeEquivalentTo(expected);
        }
    }
}