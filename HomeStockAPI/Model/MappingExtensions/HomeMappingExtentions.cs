using HomeStock.Data;
using HomeStock.Managers;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using OwnerStock.Model.MappingExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.MappingExtensions
{
	public static class HomeMappingExtentions
    {
        public static Home Map(this mHome home)
        {
            var newHome = new Home()
            {
                Id = home.Id,
                Name = home.Name,
                Created = home.Created,
                OwnerId = home.Owner.Id,
                Owner = home.Owner.Name
            };
            return newHome;
        }

        public static IEnumerable<Home> Map(this IEnumerable<mHome> home)
        {
            return home.Select(s => s.Map());
        }

        public static mHome Map(this Home home)
        {
            mOwner owner;
            using (var context = new HomeStockContext())
            {
                owner = new OwnerManager(context).Get(home.OwnerId);
            }
            var newHome = new mHome()
            {
                Id = home.Id,
                Name = home.Name,
                Created = home.Created,
                Owner = owner,
                OwnerId = home.OwnerId
            };
            return newHome;
        }

        public static IEnumerable<mHome> Map(this IEnumerable<Home> home)
        {
            return home.Select(s => s.Map());
        }
    }
}