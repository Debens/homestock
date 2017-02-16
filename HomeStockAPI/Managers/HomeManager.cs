using HomeStock.Data;
using HomeStock.Exceptions;
using HomeStock.Model.Internal;
using HomeStock.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Managers
{
    public class HomeManager : BaseEntityManager<mHome, HomeRepository, HomeStockContext>
    {
        public int OwnerId { get; set; }
        
        public HomeManager(int ownerId) : base() { this.OwnerId = ownerId; }
        public HomeManager(mHome home, int ownerId) : base(home) { this.OwnerId = ownerId; }
        public HomeManager(HomeStockContext context, int ownerId) : base(context) { this.OwnerId = ownerId; this.Repository = new HomeRepository(Context); }
        public HomeManager(HomeStockContext context, mHome home, int ownerId) : base(context, home) { this.OwnerId = ownerId; this.Repository = new HomeRepository(Context); }

        public override mHome Create()
        {
            var newHome = new mHome
            {
                Name = WorkingEntity.Name,
                Created = DateTime.UtcNow,
                OwnerId = WorkingEntity.OwnerId,
                Owner = WorkingEntity.Owner,
                Containers = WorkingEntity.Containers
            };
            WorkingEntity = newHome;
            return WorkingEntity;
        }

        public override mHome TransferFields(mHome fromHome, mHome toHome)
        {
            toHome.Name = fromHome.Name;
            toHome.OwnerId = fromHome.OwnerId;
            return toHome;
        }

        public mHome Get(int homeId)
        {
            mOwner owner = new OwnerManager(Context).Get(OwnerId);
            mHome home = Repository.Get(homeId);
            if (home.OwnerId == owner.Id)
                return home;
            else
                throw new EntityDoesNotExistException("Cannot find home, Id \"" + home.Id + "\", belonging to owner, Id \"" + owner.Id + "\".", home.Id);
        }

        public IEnumerable<mHome> Get()
        {
            return Repository.GetWhere(h => h.OwnerId == OwnerId);
        }

        public void Delete(int homeId)
        {
            mOwner owner = new OwnerManager(Context).Get(OwnerId);
            mHome home = Repository.Get(homeId);
            if (home.OwnerId == owner.Id)
                Repository.Delete(OwnerId);
            else
                throw new EntityDoesNotExistException("Cannot find home, Id \"" + home.Id + "\", belonging to owner, Id \"" + owner.Id + "\".", home.Id);
        }
    }
}