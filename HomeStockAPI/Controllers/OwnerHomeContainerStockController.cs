using HomeStockAPI.Managers;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping;
using HomeStockAPI.Repository;
using HomeStockAPI.Services;
using System.Web.Http;

namespace ContainerStock.Controllers
{
    [RoutePrefix("api/owner/{ownerId:length(12)}/home/{homeId:length(12)}/container/{containerId:length(12)}/inventory")]
    public class OwnerHomeContainerStockController : ApiController
    {
        protected Service<Stock, mStock, StockManager, StockRepository> service
        {
            get
            {
                return new Service<Stock, mStock, StockManager, StockRepository>()
                {
                    Manager = new StockManager()
                    {
                        Repository = new StockRepository(),
                        ParentMatch = (pId) => (s => s.ContainerId == pId)
                    },
                    Mapper = new StockMapping()
                };
            }
        }

        //[Route("", Name = "PostStock")]
        //public IHttpActionResult Post(string ownerId, string homeId, string containerId, Stock stock)
        //{
        //    stock.ContainerId = containerId;
        //    return Ok(service.Create(stock));
        //    //return CreatedAtRoute("GetStock", new { ownerId = stock.Container.Home.Owner.Id, homeId = stock.Container.Home.Id, containerId = stock.Container.Id, stockId = stock.Id }, stock);
        //}

        //[Route("", Name = "GetAllStocks")]
        //public IHttpActionResult GetAll(string ownerId, string homeId, string containerId)
        //{
        //    return Ok(service.GetAll(containerId));
        //}

        //[Route("{stockId:length(40)}", Name = "GetStock")]
        //public IHttpActionResult Get(string ownerId, string homeId, string containerId, string stockId)
        //{
        //    return Ok(service.Get(stockId));
        //}

        //[Route("{stockId:length(40)}", Name = "PutStock")]
        //public IHttpActionResult Put(string ownerId, string homeId, string containerId, string stockId, Stock stock)
        //{
        //    stock.Id = stockId;
        //    stock.ContainerId = containerId;
        //    return Ok(service.Update(stock));
        //}

        //[Route("{stockId:length(40)}", Name = "DeleteStock")]
        //public void Delete(string ownerId, string homeId, string containerId, string stockId)
        //{
        //    service.Delete(stockId);
        //}
    }
}
