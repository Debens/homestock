using HomeStock.Data;
using HomeStock.Managers;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using HomeStock.Repository;
using OwnerStock.Model.MappingExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Services
{
    public class OwnerService
    {

        public string OwnerId { get; set; }

        public OwnerService(string ownerId)
        {
            this.OwnerId = ownerId;
        }
        
        public OwnerHomeService Homes(string homeId)
        {
            return new OwnerHomeService(OwnerId, homeId);
        }

        public static Owner Create(Owner owner)
        {
            using (var context = new HomeStockContext())
            {
                mOwner internalOwner = owner.Map();
                var ownerManager = new OwnerManager(context, internalOwner);
                internalOwner = ownerManager.Insert();
                context.SaveChanges();
                Owner createdOwner = internalOwner.Map();
                return createdOwner;
            }
        }

        public static List<Owner> GetAll()
        {
            using (var context = new HomeStockContext())
            {
                var ownerManager = new OwnerManager(context);
                return ownerManager.Get().Map().ToList();
            }
        }

        public Owner Get()
        {
            using (var context = new HomeStockContext())
            {
                var ownerManager = new OwnerManager(context);
                return ownerManager.Get(OwnerId).Map();
            }
        }

        public Owner Update(Owner owner)
        {
            using (var context = new HomeStockContext())
            {
                owner.Id = OwnerId;
                mOwner internalOwner = owner.Map();
                var ownerManager = new OwnerManager(context, internalOwner);
                internalOwner = ownerManager.Update();
                context.SaveChanges();
                Owner newOwner = internalOwner.Map();
                return newOwner;
            }
        }

        public void Delete()
        {
            using (var context = new HomeStockContext())
            {
                var ownerManager = new OwnerManager(context);
                ownerManager.Delete(OwnerId);
                context.SaveChanges();
            }
        }
    }
}