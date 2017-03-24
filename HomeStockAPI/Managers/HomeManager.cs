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
        public string OwnerId { get; set; }
        
        public HomeManager(string ownerId) : base() { this.OwnerId = ownerId; }
        public HomeManager(mHome home, string ownerId) : base(home) { this.OwnerId = ownerId; }
        public HomeManager(HomeStockContext context, string ownerId) : base(context) { this.OwnerId = ownerId; this.Repository = new HomeRepository(Context); }
        public HomeManager(HomeStockContext context, mHome home, string ownerId) : base(context, home) { this.OwnerId = ownerId; this.Repository = new HomeRepository(Context); }

        public override mHome Create()
        {
            var newHome = new mHome
            {
                Id = WorkingEntity.Id,
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

        public mHome Get(string homeId)
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

        public void Delete(string homeId)
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