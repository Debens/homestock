
using HomeStock.Data;
using HomeStock.Model.Internal;
using System.Collections.Generic;
using System.Linq;
using System;
using HomeStock.Exceptions;

namespace HomeStock.Repository
{
    public class BaseHomeStockRepository<T> : IRepository<T>
        where T : mEntity
    {
        public HomeStockContext Context
        {
            get;
            set;
        }
       
        public BaseHomeStockRepository(HomeStockContext context)
        {
            this.Context = context;
        }

        public virtual T Insert(T entity)
        {
            Context.Set<T>().Add(entity);
            return entity;
        }

        public virtual T Update(T newEntity)
        {
            T oldEntity = Get(newEntity.Id);
            oldEntity = newEntity;
            return oldEntity;
        }

        public virtual T Get(string Id)
        {
            if (!Context.Set<T>().Any(e => e.Id == Id))
            {
                throw new EntityDoesNotExistException($"Cannot retrieve entity of type '{typeof(T)}', with ID No. '{Id}', as it does not exist.", Id);
            }

            T entity = Context.Set<T>().Single(e => e.Id == Id);
            return entity;
        }

        public virtual void Delete(T entity)
        {
            Delete(entity.Id);
        }

        public virtual void Delete(string Id)
        {
            T existingEnitity = Get(Id);
            Context.Set<T>().Remove(existingEnitity);
        }

        public virtual IEnumerable<T> GetAll()
        {
            return Context.Set<T>();
        }

        public virtual IEnumerable<T> Insert(IEnumerable<T> entities)
        {
            return entities.Select(e => Insert(e));
        }

        public virtual IEnumerable<T> Update(IEnumerable<T> newEntities)
        {
            return newEntities.Select(e => Update(e));
        }

        public virtual IEnumerable<T> Get(IEnumerable<string> Ids)
        {
            return Ids.Select(id => Get(id));
        }

        public virtual void Delete(IEnumerable<T> entities)
        {
            Delete(entities.Select(e => e.Id));
        }

        public virtual void Delete(IEnumerable<string> Ids)
        {
            foreach (string Id in Ids)
            {
                Delete(Ids);
            }
        }

        public virtual IEnumerable<T> GetWhere(Func<T, bool> predicate)
        {
            return Context.Set<T>().Where(predicate);
        }
    }
}