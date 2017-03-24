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
    public class OwnerHomeContainerService
    {
        public string OwnerId { get; set; }
        public string HomeId { get; set; }
        public string ContainerId { get; set; }

        public OwnerHomeContainerService(string ownerId, string homeId, string containerId)
        {
            this.OwnerId = ownerId;
            this.HomeId = homeId;
            this.ContainerId = containerId;
        }

        public static Container Create(Container container)
        {
            using (var context = new HomeStockContext())
            {
                mContainer internalContainer = container.Map();
                var containerManager = new ContainerManager(context, internalContainer, internalContainer.Home.Owner.Id, internalContainer.Home.Id);
                internalContainer = containerManager.Insert();
                context.SaveChanges();
                Container newHome = internalContainer.Map();
                return newHome;
            }
        }

        public static List<Container> GetAll(string ownerId, string homeId)
        {
            using (var context = new HomeStockContext())
            {
                var containerManager = new ContainerManager(context, ownerId, homeId);
                return containerManager.Get().Map().ToList();
            }
        }

        public Container Get()
        {
            using (var context = new HomeStockContext())
            {
                var containerManager = new ContainerManager(context, OwnerId, HomeId);
                return containerManager.Get(ContainerId).Map();
            }
        }

        public Container Update(Container container)
        {
            using (var context = new HomeStockContext())
            {
                container.Id = ContainerId;
                mContainer internalContainer = container.Map();
                var containerManager = new ContainerManager(context, internalContainer, OwnerId, HomeId);
                internalContainer = containerManager.Update();
                context.SaveChanges();
                Container newHome = internalContainer.Map();
                return newHome;
            }
        }

        public void Delete()
        {
            using (var context = new HomeStockContext())
            {
                var repository = new ContainerManager(context, OwnerId, HomeId);
                repository.Delete(ContainerId);
                context.SaveChanges();
            }
        }
    }
}