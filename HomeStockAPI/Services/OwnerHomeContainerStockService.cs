using HomeStock.Data;
using HomeStock.Managers;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using HomeStock.Model.MappingExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Services
{
    public class OwnerHomeContainerStockService
    {
        public int OwnerId { get; set; }
        public int HomeId { get; set; }
        public int ContainerId { get; set; }
        public int StockId { get; set; }

        public OwnerHomeContainerStockService(int ownerId, int homeId, int containerId, int stockId)
        {
            this.OwnerId = ownerId;
            this.HomeId = homeId;
            this.ContainerId = containerId;
            this.StockId = stockId;
        }

        public static Stock Create(Stock stock)
        {
            using (var context = new HomeStockContext())
            {
                mStock internalStock = stock.Map();
                var stockManager = new StockManager(context, internalStock, internalStock.Container.Home.Owner.Id, internalStock.Container.Home.Id, internalStock.Container.Id);
                internalStock = stockManager.Insert();
                context.SaveChanges();
                Stock newHome = internalStock.Map();
                return newHome;
            }
        }

        public static List<Stock> GetAll(int ownerId, int homeId, int containerId)
        {
            using (var context = new HomeStockContext())
            {
                var stockManager = new StockManager(context, ownerId, homeId, containerId);
                return stockManager.Get().Map().ToList();
            }
        }

        public Stock Get()
        {
            using (var context = new HomeStockContext())
            {
                var stockManager = new StockManager(context, OwnerId, HomeId, ContainerId);
                return stockManager.Get(StockId).Map();
            }
        }

        public Stock Update(Stock stock)
        {
            using (var context = new HomeStockContext())
            {
                stock.ContainerId = ContainerId;
                stock.Id = ContainerId;
                mStock internalStock = stock.Map();
                var stockManager = new StockManager(context, internalStock, OwnerId, HomeId, ContainerId);
                internalStock = stockManager.Update();
                context.SaveChanges();
                Stock newHome = internalStock.Map();
                return newHome;
            }
        }

        public void Delete()
        {
            using (var context = new HomeStockContext())
            {
                var repository = new StockManager(context, OwnerId, HomeId, ContainerId);
                repository.Delete(StockId);
                context.SaveChanges();
            }
        }
    }
}