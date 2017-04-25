using HomeStockAPI.Data;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace HomeStockAPI.Model.Mapping
{
    public class OwnerMapping : EntityMapping<Owner, mOwner>
    {
        public override mOwner Map(Owner dto, HomeStockContext context)
        {
            return new mOwner()
            {
                Id = dto.Id,
                Name = dto.Name,
                Created = dto.Created,
                Homes = new Collection<mHome>()
            };
        }

        public override Owner Map(mOwner model)
        {
            return new Owner()
            {
                Id = model.Id,
                Name = model.Name,
                Created = model.Created
            };
        }
    }
}