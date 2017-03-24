using HomeStock.Data;
using HomeStock.Managers;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using HomeStock.Model.MappingExtensions;
using HomeStock.Repository;
using OwnerStock.Model.MappingExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Services
{
    public class OwnerHomeService
    {
        public string OwnerId { get; set; }
        public string HomeId { get; set; }

        public OwnerHomeService(string ownerId, string homeId)
        {
            this.OwnerId = ownerId;
            this.HomeId = homeId;
        }

        public static Home Create(Home home)
        {
            using (var context = new HomeStockContext())
            {
                mHome internalHome = home.Map();
                var homeManager = new HomeManager(context, internalHome, home.OwnerId);
                internalHome = homeManager.Insert();
                context.SaveChanges();
                Home newHome = internalHome.Map();
                return newHome;
            }
        }

        public static List<Home> GetAll(string ownerId)
        {
            using (var context = new HomeStockContext())
            {
                var homeManager = new HomeManager(context, ownerId);
                return homeManager.Get().Map().ToList();
            }
        }

        public Home Get()
        {
            using (var context = new HomeStockContext())
            {
                var homeManager = new HomeManager(context, OwnerId);
                return homeManager.Get(HomeId).Map();
            }
        }

        public Home Update(Home home)
        {
            using (var context = new HomeStockContext())
            {
                home.Id = HomeId;
                home.OwnerId = OwnerId;
                mHome internalHome = home.Map();
                var homeManager = new HomeManager(context, internalHome, OwnerId);
                internalHome = homeManager.Update();
                context.SaveChanges();
                Home newHome = internalHome.Map();
                return newHome;
            }
        }

        public void Delete()
        {
            using (var context = new HomeStockContext())
            {
                var repository = new HomeManager(context, OwnerId);
                repository.Delete(HomeId);
                context.SaveChanges();
            }
        }
    }
}