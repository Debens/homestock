using HomeStockAPI.Data;
using HomeStockAPI.Model.Internal;

namespace HomeStockAPI.Repository
{
    public class ContainerRepository : BaseRepository<mContainer>
    {
        public ContainerRepository() : base() { }
        public ContainerRepository(HomeStockContext context) : base(context) { }
    }
}