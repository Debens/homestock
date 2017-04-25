using System.Collections.Generic;
using HomeStockAPI.Model.External;
using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal.Base;
using HomeStockAPI.Data;
using HomeStockAPI.Model.Mapping.Base;
using HomeStockAPI.Services.Base;
using HomeStockAPI.Repository;
using System.Linq;

namespace HomeStockAPI.Services
{
    public class Service<DTO, E, M, R> : IService<DTO, E, M>
        where DTO : Entity
        where E : mEntity
        where M : BaseManager<E, R>
        where R : BaseRepository<E>
    {
        public M Manager { get; set; }
        public IEntityMapping<DTO, E> Mapper { get; set; }

        public Service() { }

        public Service(M manager, IEntityMapping<DTO, E> mapper) {
            this.Manager = manager;
            this.Mapper = mapper;
        }

        public DTO Create(DTO entity)
        {
            using (var context = new HomeStockContext())
            {
                E mEntity = Manager.Insert(context, Mapper.Map(entity, context));
                context.SaveChanges();
                return Mapper.Map(mEntity);
            }
        }

        public DTO Get(string id)
        {
            using (var context = new HomeStockContext())
            {
                return Mapper.Map(Manager.Get(context, id));
            }
        }

        public DTO Update(DTO entity)
        {
            using (var context = new HomeStockContext())
            {
                E mEntity = Manager.Update(context, Mapper.Map(entity, context));
                context.SaveChanges();
                return Mapper.Map(mEntity);
            }
        }

        public void Delete(string id)
        {
            using (var context = new HomeStockContext())
            {
                Manager.Delete(context, id);
                context.SaveChanges();
            }
        }

        public IEnumerable<DTO> GetAll(string parentId)
        {
            using (var context = new HomeStockContext())
            {
                return Mapper.Map(Manager.GetAll(context, parentId)).ToList(); // Enumerate lazy list
            }
        }

        public IEnumerable<DTO> GetAll()
        {
            using (var context = new HomeStockContext())
            {
                return Mapper.Map(Manager.GetAll(context)).ToList(); // Enumerate lazy list
            }
        }
    }
}