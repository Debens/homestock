using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal.Base;
using System.Collections.Generic;

namespace HomeStockAPI.Services.Base
{
    public interface IService <DTO, E, Manager> 
        where DTO : Entity 
        where E : mEntity
        where Manager : IManager<E>
    {
        DTO Create(DTO entity);
        DTO Update(DTO entity);
        DTO Get(string id);
        void Delete(string id);

        IEnumerable<DTO> GetAll(string ParentId);
        IEnumerable<DTO> GetAll();
    }
}
