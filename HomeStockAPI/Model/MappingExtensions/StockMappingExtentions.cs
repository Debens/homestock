using HomeStock.Data;
using HomeStock.Managers;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using HomeStock.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.MappingExtensions
{
    public static class StockMappingExtentions
    {
        public static Stock Map(this mStock item)
        {
            var newStock = new Stock
            {
                Id = item.Id,
                Name = item.Name,
                Created = item.Created,
                Container = item.Container.Name,
                ContainerId = item.ContainerId,
                Expiry = item.Expiry,
                Tags = item.Tags
            };
            return newStock;
        }

        public static IEnumerable<Stock> Map(this IEnumerable<mStock> stock)
        {
            return stock.Select(s => s.Map());
        }

        public static mStock Map(this Stock item)
        {
            mContainer container;
            using (var context = new HomeStockContext())
            {
                container = new ContainerRepository(context).Get(item.ContainerId);
            }
            var newStock = new mStock
            {
                Id = item.Id,
                Name = item.Name,
                Created = item.Created,
                Container = container,
                Expiry = item.Expiry,
                Tags = item.Tags
            };
            return newStock;
        }

        public static IEnumerable<mStock> Map(this IEnumerable<Stock> stock)
        {
            return stock.Select(s => s.Map());
        }
    }
}