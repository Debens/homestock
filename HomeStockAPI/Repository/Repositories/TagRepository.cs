using HomeStockAPI.Data;
using HomeStockAPI.Model.Internal;

namespace HomeStockAPI.Repository
{
    public class TagRepository : BaseRepository<mTag>
    {
        public TagRepository() : base() { }
        public TagRepository(HomeStockContext context) : base(context) { }
    }
}