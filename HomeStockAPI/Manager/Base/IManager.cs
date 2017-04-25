using HomeStockAPI.Data;
using HomeStockAPI.Model.Internal.Base;
using System.Collections.Generic;

namespace HomeStockAPI.Managers.Base
{
    public interface IManager<E> where E : mEntity
    {
        E Insert(HomeStockContext context, E entity);
        E Update(HomeStockContext context, E entity);

        E Get(HomeStockContext context, string id);
        void Delete(HomeStockContext context, string id);

        IEnumerable<E> GetAll(HomeStockContext context, string parentId);
        IEnumerable<E> GetAll(HomeStockContext context);
    }
}
