using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;
using System;

namespace HomeStockAPI.Manager.Managers
{
    public class TagManager : BaseManager<mTag, TagRepository>
    {
        public TagManager() : base() { }
        public TagManager(TagRepository repository, Func<mTag, bool> parentSearchPredicate) : base(repository)
        {
            _parentSearchPredicate = parentSearchPredicate;
        }

        private Func<mTag, bool> _parentSearchPredicate;
        protected override Func<mTag, bool> ParentSearchPredicate(string parentId)
        {
            return _parentSearchPredicate;
        }

        protected override mTag ComposeEntity(ref mTag tag)
        {
            tag.Created = DateTime.UtcNow;
            return tag;
        }

        protected override mTag UpdateEntity(mTag from, ref mTag to)
        {
            to.Name = from.Name;
            to.OwnerId = from.OwnerId;
            to.Owner = from.Owner;
            to.Stock = from.Stock;
            return to;
        }
    }
}