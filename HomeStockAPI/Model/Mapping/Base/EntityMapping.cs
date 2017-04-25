using HomeStockAPI.Data;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStockAPI.Model.Mapping.Base
{
    public abstract class EntityMapping<DTO, E> : IEntityMapping<DTO, E>
        where DTO : Entity
        where E : mEntity
    {
        public abstract E Map(DTO dto, HomeStockContext contexto);
        public abstract DTO Map(E model);

        public IEnumerable<E> Map(IEnumerable<DTO> dtos, HomeStockContext context)
        {
            return dtos.Select(dto => Map(dto, context));
        }

        public IEnumerable<DTO> Map(IEnumerable<E> entities)
        {
            return entities.Select(e => Map(e));
        }
    }
}