using HomeStockAPI.Data;
using HomeStockAPI.Model.Internal;

namespace HomeStockAPI.Repository
{
    public class HomeRepository : BaseRepository<mHome>
    {
        public HomeRepository() : base() { }
        public HomeRepository(HomeStockContext context) : base(context) { }
    }
}