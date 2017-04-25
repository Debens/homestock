using HomeStockAPI.Data;
using HomeStockAPI.Model.Internal;

namespace HomeStockAPI.Repository
{
    public class OwnerRepository : BaseRepository<mOwner>
    {
        public OwnerRepository() : base() { }
        public OwnerRepository(HomeStockContext context) : base(context) { }
    }
}