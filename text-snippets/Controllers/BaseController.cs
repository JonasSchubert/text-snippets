using System;
using System.Collections.Generic;
using guepardoapps.text_snippets.Database.Factories;
using guepardoapps.text_snippets.Database.Models;
using guepardoapps.text_snippets.Database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace guepardoapps.text_snippets.Controllers
{
    public abstract class BaseController<TEntity, TController, TRepository, TFactory> : ControllerBase
        where TEntity : Entity
        where TRepository : IBaseRepository<TEntity>
        where TFactory : IBaseFactory<TEntity>
    {
        protected readonly ILogger<TController> _logger;

        protected readonly TRepository _repository;

        protected readonly TFactory _factory;

        public BaseController(ILogger<TController> logger, TRepository repository, TFactory factory)
        {
            _logger = logger;
            _repository = repository;
            _factory = factory;
        }

        [HttpPut]
        public virtual bool Add([FromBody] TEntity entity)
        {
            var id = _repository.Create(entity);
            _repository.SaveChanges();
            return id != Guid.Empty;
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual bool Delete(Guid id)
        {
            var entity = _repository.SingleOrDefault(item => item.Id == id);
            if (entity != null)
            {
                _repository.Delete(entity);
                _repository.SaveChanges();
                return true;
            }
            return false;
        }

        [HttpGet]
        public virtual IList<TEntity> Get() => _repository.Get();

        [HttpPost]
        public virtual bool Update([FromBody] TEntity entity)
        {
            var existingEntity = _repository.FirstOrDefault(item => item.Id == entity.Id);
            if (existingEntity != null)
            {
                existingEntity = _factory.Map(entity, existingEntity);
                _repository.Update(existingEntity);
                _repository.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
