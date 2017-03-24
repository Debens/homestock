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
    public class StockManager : BaseEntityManager<mStock, StockRepository, HomeStockContext>
    {
        public string OwnerId { get; set; }
        public string HomeId { get; set; }
        public string ContainerId { get; set; }

        public StockManager(string ownerId, string homeId, string containerId) : base() { this.OwnerId = ownerId; this.HomeId = homeId; this.ContainerId = containerId; }
        public StockManager(mStock stock, string ownerId, string homeId, string containerId) : base(stock) { this.OwnerId = ownerId; this.HomeId = homeId; this.ContainerId = containerId; }
        public StockManager(HomeStockContext context, string ownerId, string homeId, string containerId) : base(context) { this.OwnerId = ownerId; this.HomeId = homeId; this.ContainerId = containerId; this.Repository = new StockRepository(Context); }
        public StockManager(HomeStockContext context, mStock stock, string ownerId, string homeId, string containerId) : base(context, stock) { this.OwnerId = ownerId; this.HomeId = homeId; this.ContainerId = containerId; this.Repository = new StockRepository(Context); }

        public override mStock Create()
        {
            var newStock = new mStock
            {
                Id = WorkingEntity.Id,
                Name = WorkingEntity.Name,
                Created = DateTime.UtcNow,
                ContainerId = WorkingEntity.ContainerId,
                Container = WorkingEntity.Container,
                Expiry = WorkingEntity.Expiry,
                Tags = WorkingEntity.Tags
            };
            WorkingEntity = newStock;
            return WorkingEntity;
        }

        public override mStock TransferFields(mStock fromItem, mStock toItem)
        {
            toItem.Name = fromItem.Name;
            toItem.Tags = fromItem.Tags;
            toItem.Expiry = fromItem.Expiry;
            toItem.ContainerId = fromItem.ContainerId;
            return toItem;
        }

        public mStock Get(string stockId)
        {
            mOwner owner = new OwnerManager(Context).Get(OwnerId);
            mHome home = new HomeManager(Context, OwnerId).Get(HomeId);
            mContainer container = new ContainerManager(Context, OwnerId, HomeId).Get(ContainerId);
            mStock stock = Repository.Get(stockId);
            if (stock.ContainerId == container.Id && stock.Container.Home.OwnerId == owner.Id && stock.Container.HomeId == home.Id)
                return stock;
            else
                throw new EntityDoesNotExistException("Cannot find stock, Id \"" + stock.Id + "\", in Container, Id \"" + container.Id + "\", in home, Id \"" + home.Id + "\", belonging to owner, Id \"" + owner.Id + "\".", container.Id);
        }

        public IEnumerable<mStock> Get()
        {
            return Repository.GetWhere(s => s.Container.Home.OwnerId == OwnerId && s.Container.HomeId == HomeId && s.ContainerId == ContainerId);
        }

        public void Delete(string stockId)
        {
            mOwner owner = new OwnerManager(Context).Get(OwnerId);
            mHome home = new HomeManager(Context, OwnerId).Get(HomeId);
            mContainer container = new ContainerManager(Context, OwnerId, HomeId).Get(ContainerId);
            mStock stock = Repository.Get(stockId);
            if (container.Home.OwnerId == owner.Id && container.HomeId == home.Id)
                Repository.Delete(stock.Id);
            else
                throw new EntityDoesNotExistException("Cannot find stock, Id \"" + stock.Id + "\", in Container, Id \"" + container.Id + "\", in home, Id \"" + home.Id + "\", belonging to owner, Id \"" + owner.Id + "\".", container.Id);
        }
    }
}