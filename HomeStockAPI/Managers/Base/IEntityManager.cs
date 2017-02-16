using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Managers
{
    public interface IEntityManager<T> where T : mEntity
    {
        T Insert();
        T TransferFields(T newEntity, T oldEntity);
        T Create();
    }
}