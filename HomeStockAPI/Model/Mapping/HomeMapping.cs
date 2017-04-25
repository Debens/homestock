using HomeStockAPI.Data;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping.Base;
using HomeStockAPI.Repository;

namespace HomeStockAPI.Model.Mapping
{
    public class HomeMapping : EntityMapping<Home, mHome>
    {
        public override mHome Map(Home dto, HomeStockContext context)
        {
            mOwner owner = new OwnerRepository(context).Get(dto.OwnerId);
            return new mHome()
            {
                Id = dto.Id,
                Name = dto.Name,
                Created = dto.Created,
                Owner = owner,
                OwnerId = dto.OwnerId
            };
        }

        public override Home Map(mHome model)
        {
            return new Home()
            {
                Id = model.Id,
                Name = model.Name,
                Created = model.Created,
                OwnerId = model.Owner.Id
            };
        }
    }
}