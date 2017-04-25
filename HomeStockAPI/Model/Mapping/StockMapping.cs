using HomeStockAPI.Data;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping.Base;
using HomeStockAPI.Repository;

namespace HomeStockAPI.Model.Mapping
{
    public class StockMapping : EntityMapping<Stock, mStock>
    {
        public override mStock Map(Stock dto, HomeStockContext context)
        {
            mContainer container = new ContainerRepository(context).Get(dto.ContainerId);
            return new mStock
            {
                Id = dto.Id,
                Name = dto.Name,
                Created = dto.Created,
                Container = container,
                Expiry = dto.Expiry,
                Tags = dto.Tags
            };
        }

        public override Stock Map(mStock model)
        {
            return new Stock
            {
                Id = model.Id,
                Name = model.Name,
                Created = model.Created,
                Container = model.Container.Name,
                ContainerId = model.ContainerId,
                Expiry = model.Expiry,
                Tags = model.Tags
            };
        }
    }
}