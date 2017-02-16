using HomeStock.Data;
using HomeStock.Model.Internal;
using HomeStock.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Managers
{
    public class OwnerManager : BaseEntityManager<mOwner, OwnerRespository, HomeStockContext>
    {
        public OwnerManager() : base() { }
        public OwnerManager(mOwner owner) : base(owner) { }
        public OwnerManager(HomeStockContext context) : base(context) { this.Repository = new OwnerRespository(Context); }
        public OwnerManager(HomeStockContext context, mOwner owner) : base(context, owner) { this.Repository = new OwnerRespository(Context); }

        public override mOwner Create()
        {
            var newOwner = new mOwner
            {
                Name = WorkingEntity.Name,
                Created = DateTime.UtcNow,
                Homes = WorkingEntity.Homes
            };
            WorkingEntity = newOwner;
            return newOwner;
        }

        public override mOwner TransferFields(mOwner fromOwner, mOwner toOwner)
        {
            toOwner.Homes = fromOwner.Homes;
            toOwner.Name = fromOwner.Name;
            return toOwner;
        }

        public mOwner Get(int ownerId)
        {
            return Repository.Get(ownerId);
        }

        public IEnumerable<mOwner> Get()
        {
            return Repository.GetAll();
        }

        public void Delete(int ownerId)
        {
            Repository.Delete(ownerId);
        }
    }
}