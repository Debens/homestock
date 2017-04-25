using HomeStockAPI.Data;
using HomeStockAPI.Model.Internal;

namespace HomeStockAPI.Repository
{
    public class StockRepository : BaseRepository<mStock>
    {
        public StockRepository() : base() { }
        public StockRepository(HomeStockContext context) : base(context) { }
    }
}