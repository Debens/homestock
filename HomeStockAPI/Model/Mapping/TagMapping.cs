using HomeStockAPI.Data;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping.Base;
using HomeStockAPI.Repository;
using System.Collections.ObjectModel;

namespace HomeStockAPI.Model.Mapping
{
    public class TagMapping : EntityMapping<Tag, mTag>
    {
        public override mTag Map(Tag dto)
        {
            mOwner owner;
            using (var context = new HomeStockContext())
                owner = new OwnerRepository(context).Get(dto.OwnerId);

            return new mTag()
            {
                Id = dto.Id,
                Name = dto.Name,
                Created = dto.Created,
                Owner = owner,
                OwnerId = dto.OwnerId,
                Stock = new Collection<mStock>()
            };
        }

        public override Tag Map(mTag model)
        {
            return new Tag()
            {
                Id = model.Id,
                Name = model.Name,
                Created = model.Created,
                OwnerId = model.Owner.Id,
                Owner = model.Owner.Name
            };
        }
    }
}