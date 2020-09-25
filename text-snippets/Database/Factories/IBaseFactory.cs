using guepardoapps.text_snippets.Database.Models;

namespace guepardoapps.text_snippets.Database.Factories
{
    public interface IBaseFactory<T> where T : Entity
    {
        T Map(T entity, T originalEntity);
    }
}
