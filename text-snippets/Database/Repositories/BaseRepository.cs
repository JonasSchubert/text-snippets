using System;
using System.Collections.Generic;
using System.Linq;
using guepardoapps.text_snippets.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace guepardoapps.text_snippets.Database.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : Entity
    {
        public IDbContext Context { get; }

        protected DbSet<T> Set { get; }

        public BaseRepository(IDbContext context)
        {
            Context = context;
            Set = Context.Set<T>();
        }

        public void Attach(IEnumerable<Guid> entityIds)
        {
            entityIds.ToList().ForEach(id =>
            {
                T entity = (T)Activator.CreateInstance(typeof(T), true);
                entity.Id = id;
                AttachIfRequired(entity);
            });
        }

        public Guid Create(T entity)
        {
            entity.Id = Guid.NewGuid();
            entity.DateTimeAdded = DateTime.UtcNow;
            Set.Add(entity);
            return entity.Id;
        }

        public void Create(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                Create(entity);
            }
        }

        public void Delete(T entity)
        {
            AttachIfRequired(entity);
            Set.Remove(entity);
        }

        public void Detach(IEnumerable<T> entities) => entities
            .ToList()
            .ForEach(k => Context.Entry(k).State = EntityState.Detached);

        public bool Exists(Guid id) => Set.Any(x => x.Id == id);

        public T FirstOrDefault(Func<T, bool> predicate) => Get().FirstOrDefault(predicate);

        public IList<T> Get() => Set.ToList();

        public IList<T> Get(Func<T, bool> predicate) => Get().Where(predicate).ToList();

        public void SaveChanges() => Context.SaveChanges();

        public T SingleOrDefault(Func<T, bool> predicate) => Get().SingleOrDefault(predicate);

        public void Update(T entity) => Set.Update(entity);

        protected void AttachIfRequired(T entity)
        {
            if (Context.ChangeTracker.Entries<T>().All(item => item.Entity.Id != entity.Id))
            {
                Set.Attach(entity);
            }
        }

        protected IList<string> GetPrimaryKeyPropertyNames(T entity) => Context
            .Model
            .FindEntityType(typeof(T))
            .FindPrimaryKey()
            .Properties
            .Select(x => x.Name)
            .ToList();
    }
}
