using HomeStock.Model.External;
using HomeStock.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContainerStock.Controllers
{
    [RoutePrefix("api/owner/{ownerId}/home/{homeId}/container/{containerId}/inventory")]
    public class OwnerHomeContainerStockController : ApiController
    {
        [Route("", Name = "PostStock")]
        public IHttpActionResult Post(int ownerId, int homeId, int containerId, Stock stock)
        {
            stock.ContainerId = containerId;
            stock = OwnerHomeContainerStockService.Create(stock);
            return Ok(stock);
            //return CreatedAtRoute("GetStock", new { ownerId = stock.Container.Home.Owner.Id, homeId = stock.Container.Home.Id, containerId = stock.Container.Id, stockId = stock.Id }, stock);
        }

        [Route("", Name = "GetAllStocks")]
        public IHttpActionResult GetAll(int ownerId, int homeId, int containerId)
        {
            return Ok(OwnerHomeContainerStockService.GetAll(ownerId, homeId, containerId));
        }

        [Route("{stockId:int}", Name = "GetStock")]
        public IHttpActionResult Get(int ownerId, int homeId, int containerId, int stockId)
        {
            var service = new OwnerHomeContainerStockService(ownerId, homeId, containerId, stockId);
            return Ok(service.Get());
        }

        [Route("{stockId:int}", Name = "PutStock")]
        public IHttpActionResult Put(int ownerId, int homeId, int containerId, int stockId, Stock stock)
        {
            var service = new OwnerHomeContainerStockService(ownerId, homeId, containerId, stockId);
            return Ok(service.Update(stock));
        }

        [Route("{stockId:int}", Name = "DeleteStock")]
        public void Delete(int ownerId, int homeId, int containerId, int stockId)
        {
            new OwnerHomeContainerStockService(ownerId, homeId, containerId, stockId).Delete();
        }
    }
}
