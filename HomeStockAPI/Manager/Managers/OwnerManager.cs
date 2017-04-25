using System;
using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;

namespace HomeStockAPI.Managers
{
    public class OwnerManager : BaseManager<mOwner, OwnerRepository>
    {
        public OwnerManager() { }
        public OwnerManager(OwnerRepository repository, Func<string, Func<mOwner, bool>> parentMatch) : base(repository, parentMatch) { }

        public override Func<string, Func<mOwner, bool>> ParentMatch { get; set; }

        protected override mOwner ComposeEntity(ref mOwner owner)
        {
            owner.Created = DateTime.UtcNow;
            return owner;
        }

        protected override mOwner UpdateEntity(mOwner from, ref mOwner to)
        {
            to.Homes = from.Homes;
            to.Name = from.Name;
            return to;
        }
    }
}