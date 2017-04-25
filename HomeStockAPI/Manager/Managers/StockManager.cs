using System;
using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;

namespace HomeStockAPI.Managers
{
    public class StockManager : BaseManager<mStock, StockRepository>
    {
        public StockManager() : base() { }
        public StockManager(StockRepository repository) : base(repository) { }

        protected override Func<mStock, bool> ParentSearchPredicate(string parentId)
        {
            return (s => s.ContainerId == parentId);
        }

        protected override mStock ComposeEntity(ref mStock stock)
        {
            stock.Created = DateTime.UtcNow;
            return stock;
        }

        protected override mStock UpdateEntity(mStock from, ref mStock to)
        {
            to.Name = from.Name;
            to.Tags = from.Tags;
            to.Expiry = from.Expiry;
            to.ContainerId = from.ContainerId;
            return to;
        }
    }
}