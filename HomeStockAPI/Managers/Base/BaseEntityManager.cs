using HomeStock.Data;
using HomeStock.Model.Internal;
using HomeStock.Repository;
using System;

namespace HomeStock.Managers
{
    public abstract class BaseEntityManager<TEntity, TRepository, TContext> : IEntityManager<TEntity> 
        where TEntity : mEntity
        where TRepository : IRepository<TEntity>
        where TContext : HomeStockContext
    {
        public virtual TEntity WorkingEntity
        {
            get;
            set;
        }

        protected TRepository Repository
        {
            get;
            set;
        }

        protected TContext Context
        {
            get {
                if (_context != null)
                {
                    return _context;
                }
                throw new ArgumentNullException("Attempting to use a null context.");
            }
            private set { _context = value; }
        }
        private TContext _context;

        public BaseEntityManager() { }
        public BaseEntityManager(TEntity entity)
        {
            this.WorkingEntity = entity;
        }
        public BaseEntityManager(TContext context)
        {
            this.Context = context;
        }
        public BaseEntityManager(TContext context, TEntity entity)
        {
            this.Context = context;
            this.WorkingEntity = entity;
        }

        public virtual TEntity Insert()
        {
            WorkingEntity = Create();
            TEntity newEntity = Repository.Insert(WorkingEntity);
            WorkingEntity = newEntity;
            return WorkingEntity;
        }

        public virtual TEntity Update()
        {
            TEntity oldEntity = Repository.Get(WorkingEntity.Id);
            WorkingEntity = TransferFields(WorkingEntity, oldEntity);
            TEntity newEntity = Repository.Update(WorkingEntity);
            WorkingEntity = newEntity;
            return WorkingEntity;
        }

        public abstract TEntity TransferFields(TEntity fromEntity, TEntity toEntity);
        
        public abstract TEntity Create();

        public TEntity Insert(TEntity entity)
        {
            WorkingEntity = entity;
            return Insert();
        }

        public TEntity Update(TEntity entity)
        {
            WorkingEntity = entity;
            return Update();
        }

        public TEntity Create(TEntity entity)
        {
            WorkingEntity = entity;
            return Create();
        }
    }
}