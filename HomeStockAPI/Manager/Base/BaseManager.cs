using HomeStock.Exceptions;
using HomeStockAPI.Data;
using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal.Base;
using HomeStockAPI.Repository;
using System;
using System.Collections.Generic;

namespace HomeStockAPI.Managers.Base
{
    public abstract class BaseManager<E, R> : IManager<E>
        where E : mEntity
        where R : BaseRepository<E>
    {
        public R Repository { get; set; }

        public abstract Func<string, Func<E, bool>> ParentMatch { get; set; }

        protected abstract E ComposeEntity(ref E entity);
        protected abstract E UpdateEntity(E from, ref E to);

        public BaseManager() { }

        public BaseManager(R repository)
        {
            Repository = repository;
        }

        public BaseManager(R repository, Func<string, Func<E, bool>> parentMatch)
        {
            Repository = repository;
            ParentMatch = parentMatch;
        }

        public E Insert(HomeStockContext context, E entity)
        {
            Repository.Context = context;
            ComposeEntity(ref entity);
            if (string.IsNullOrEmpty(entity.Id))
                throw new EntityIdentityException("Entity cannot be inserted without a valid ID", entity.Id);
            return Repository.Insert(entity);
        }

        public E Update(HomeStockContext context, E entity)
        {
            Repository.Context = context;
            E oldEntity = Repository.Get(entity.Id);
            UpdateEntity(entity, ref oldEntity);
            return Repository.Update(entity);
        }

        public E Get(HomeStockContext context, string id)
        {
            Repository.Context = context;
            return Repository.Get(id);
        }

        public void Delete(HomeStockContext context, string id)
        {
            Repository.Context = context;
            Repository.Delete(id);
        }

        public IEnumerable<E> GetAll(HomeStockContext context, string parentId)
        {
            Repository.Context = context;
            return Repository.GetWhere(ParentMatch(parentId));
        }

        public IEnumerable<E> GetAll(HomeStockContext context)
        {
            Repository.Context = context;
            return Repository.GetAll();
        }
    }
}