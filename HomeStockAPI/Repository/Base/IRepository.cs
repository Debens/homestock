
using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Repository
{
    public interface IRepository<T> where T: mEntity
    {
        T Insert(T entity);
        T Update(T entity);
        T Get(int Id);
        void Delete(T entity);
        void Delete(int Id);
        IEnumerable<T> GetAll();
        IEnumerable<T> Insert(IEnumerable<T> entities);
        IEnumerable<T> Update(IEnumerable<T> entities);
        IEnumerable<T> Get(IEnumerable<int> Ids);
        void Delete(IEnumerable<T> entities);
        void Delete(IEnumerable<int> Ids);
    }
} 