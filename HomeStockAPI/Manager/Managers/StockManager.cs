using System;
using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;

namespace HomeStockAPI.Managers
{
    public class StockManager : BaseManager<mStock, StockRepository>
    {
        public StockManager() : base() { }
        public StockManager(StockRepository repository, Func<string, Func<mStock, bool>> parentMatch) : base(repository, parentMatch) { }

        public override Func<string, Func<mStock, bool>> ParentMatch { get; set; }

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