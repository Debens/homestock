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
    public class ContainerManager : BaseEntityManager<mContainer, ContainerRepository, HomeStockContext>
    {
        public int OwnerId { get; set; }
        public int HomeId { get; set; }

        public ContainerManager(int ownerId, int homeId) : base() { this.OwnerId = ownerId; this.HomeId = homeId; }
        public ContainerManager(mContainer container, int ownerId, int homeId) : base(container) { this.OwnerId = ownerId; this.HomeId = homeId; }
        public ContainerManager(HomeStockContext context, int ownerId, int homeId) : base(context) { this.OwnerId = ownerId; this.HomeId = homeId; this.Repository = new ContainerRepository(Context); }
        public ContainerManager(HomeStockContext context, mContainer container, int ownerId, int homeId) : base(context, container) { this.OwnerId = ownerId; this.HomeId = homeId; this.Repository = new ContainerRepository(Context); }

        public override mContainer Create()
        {
            var newContainer = new mContainer
            {
                Name = WorkingEntity.Name,
                Created = DateTime.UtcNow,
                HomeId = WorkingEntity.HomeId,
                Home = WorkingEntity.Home,
                Inventory = WorkingEntity.Inventory
            };
            WorkingEntity = newContainer;
            return WorkingEntity;
        }

        public override mContainer TransferFields(mContainer fromContainer, mContainer toContainer)
        {
            toContainer.Name = fromContainer.Name;
            toContainer.HomeId = fromContainer.HomeId;
            toContainer.Inventory = fromContainer.Inventory;
            toContainer.Home = fromContainer.Home;
            return toContainer;
        }

        public mContainer Get(int containerId)
        {
            mOwner owner = new OwnerManager(Context).Get(OwnerId);
            mHome home = new HomeManager(Context, OwnerId).Get(HomeId);
            mContainer container = Repository.Get(containerId);
            if (container.Home.OwnerId == owner.Id && container.HomeId == home.Id)
                return container;
            else
                throw new EntityDoesNotExistException("Cannot find Container, Id \"" + container.Id + "\", in home, Id \"" + home.Id + "\", belonging to owner, Id \"" + owner.Id + "\".", container.Id);
        }

        public IEnumerable<mContainer> Get()
        {
            return Repository.GetWhere(c => c.Home.OwnerId == OwnerId && c.HomeId == HomeId);
        }

        public void Delete(int containerId)
        {
            mOwner owner = new OwnerManager(Context).Get(OwnerId);
            mHome home = new HomeManager(Context, OwnerId).Get(HomeId);
            mContainer container = Repository.Get(containerId);
            if (container.Home.OwnerId == owner.Id && container.HomeId == home.Id)
                Repository.Delete(containerId);
            else
                throw new EntityDoesNotExistException("Cannot find Container, Id \"" + container.Id + "\", in home, Id \"" + home.Id + "\", belonging to owner, Id \"" + owner.Id + "\".", container.Id);
        }
    }
}