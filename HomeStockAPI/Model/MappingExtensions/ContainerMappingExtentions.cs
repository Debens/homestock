using HomeStock.Data;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using HomeStock.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.MappingExtensions
{
    public static class ContainerMappingExtentions
    {
        public static Container Map(this mContainer container)
        {
            var newContainer = new Container()
            {
                Id = container.Id,
                Name = container.Name,
                Created = container.Created,
                HomeId = container.Home.Id,
                Home = container.Home.Name
            };
            return newContainer;
        }

        public static IEnumerable<Container> Map(this IEnumerable<mContainer> container)
        {
            return container.Select(s => s.Map());
        }

        public static mContainer Map(this Container container)
        {
            mHome home;
            using (var context = new HomeStockContext())
            {
                home = new HomeRepository(context).Get(container.HomeId);
            }
            var newContainer = new mContainer()
            {
                Id = container.Id,
                Name = container.Name,
                Created = container.Created,
                Home = home
            };
            return newContainer;
        }

        public static IEnumerable<mContainer> Map(this IEnumerable<Container> container)
        {
            return container.Select(s => s.Map());
        }
    }
}