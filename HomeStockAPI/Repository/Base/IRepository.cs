using HomeStockAPI.Model.Internal.Base;
using System;
using System.Collections.Generic;

namespace HomeStockAPI.Repository
{
    public interface IRepository<T> where T: mEntity
    {
        T Insert(T entity);
        T Update(T entity);
        T Get(string Id);
        void Delete(T entity);
        void Delete(string Id);
        IEnumerable<T> GetAll();
        IEnumerable<T> Insert(IEnumerable<T> entities);
        IEnumerable<T> Update(IEnumerable<T> entities);
        IEnumerable<T> Get(IEnumerable<string> Ids);
        IEnumerable<T> GetWhere(Func<T, bool> predicate);
        void Delete(IEnumerable<T> entities);
        void Delete(IEnumerable<string> Ids);
    }
} 