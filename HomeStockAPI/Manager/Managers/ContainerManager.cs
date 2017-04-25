using System;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;
using HomeStockAPI.Managers.Base;

namespace HomeStockAPI.Managers
{
    public class ContainerManager : BaseManager<mContainer, ContainerRepository>
    {
        public ContainerManager() : base() { }
        public ContainerManager(ContainerRepository repository) : base(repository) { }

        protected override Func<mContainer, bool> ParentSearchPredicate(string parentId)
        {
            return (c => c.HomeId == parentId);
        }

        protected override mContainer ComposeEntity(ref mContainer container)
        {
            container.Created = DateTime.UtcNow;
            return container;
        }
        
        protected override mContainer UpdateEntity(mContainer from, ref mContainer to)
        {
            to.Name = from.Name;
            to.HomeId = from.HomeId;
            to.Inventory = from.Inventory;
            to.Home = from.Home;
            return to;
        }
    }
}