using System;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;
using HomeStockAPI.Managers.Base;

namespace HomeStockAPI.Managers
{
    public class ContainerManager : BaseManager<mContainer, ContainerRepository>
    {
        public ContainerManager() : base() { }
        public ContainerManager(ContainerRepository repository, Func<string, Func<mContainer, bool>> parentMatch) : base(repository, parentMatch) { }

        public override Func<string, Func<mContainer, bool>> ParentMatch { get; set; }

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