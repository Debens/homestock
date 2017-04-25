using HomeStockAPI.Managers.Base;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Repository;
using System;

namespace HomeStockAPI.Manager.Managers
{
    public class TagManager : BaseManager<mTag, TagRepository>
    {
        public TagManager() : base() { }
        public TagManager(TagRepository repository, Func<string, Func<mTag, bool>> parentMatch) : base(repository, parentMatch) { }

        public override Func<string, Func<mTag, bool>> ParentMatch { get; set; }

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