using HomeStockAPI.Data;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping.Base;
using HomeStockAPI.Repository;

namespace HomeStockAPI.Model.Mapping
{
    public class ContainerMapping : EntityMapping<Container, mContainer>
    {
        public override mContainer Map(Container dto, HomeStockContext context)
        {
            mHome home = new HomeRepository(context).Get(dto.HomeId);
            return new mContainer()
            {
                Id = dto.Id,
                Name = dto.Name,
                Created = dto.Created,
                Home = home
            };
        }

        public override Container Map(mContainer model)
        {
            return new Container()
            {
                Id = model.Id,
                Name = model.Name,
                Created = model.Created,
                HomeId = model.Home.Id,
                Home = model.Home.Name
            };
        }
    }
}