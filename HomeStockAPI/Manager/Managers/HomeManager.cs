using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;
using System;

namespace HomeStockAPI.Managers
{
    public class HomeManager : BaseManager<mHome, HomeRepository>
    {
        public HomeManager() : base() { }
        public HomeManager(HomeRepository repository, Func<string, Func<mHome, bool>> parentMatch) : base(repository, parentMatch) { }

        public override Func<string, Func<mHome, bool>> ParentMatch { get; set; }

        protected override mHome ComposeEntity(ref mHome home)
        {
            home.Created = DateTime.UtcNow;
            return home;
        }

        protected override mHome UpdateEntity(mHome from, ref mHome to)
        {
            to.Name = from.Name;
            to.OwnerId = from.OwnerId;
            return to;
        }
    }
}