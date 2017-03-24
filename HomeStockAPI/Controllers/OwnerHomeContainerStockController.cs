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
        public IHttpActionResult Post(string ownerId, string homeId, string containerId, Stock stock)
        {
            stock.ContainerId = containerId;
            stock = OwnerHomeContainerStockService.Create(stock);
            return Ok(stock);
            //return CreatedAtRoute("GetStock", new { ownerId = stock.Container.Home.Owner.Id, homeId = stock.Container.Home.Id, containerId = stock.Container.Id, stockId = stock.Id }, stock);
        }

        [Route("", Name = "GetAllStocks")]
        public IHttpActionResult GetAll(string ownerId, string homeId, string containerId)
        {
            return Ok(OwnerHomeContainerStockService.GetAll(ownerId, homeId, containerId));
        }

        [Route("{stockId:length(40)}", Name = "GetStock")]
        public IHttpActionResult Get(string ownerId, string homeId, string containerId, string stockId)
        {
            var service = new OwnerHomeContainerStockService(ownerId, homeId, containerId, stockId);
            return Ok(service.Get());
        }

        [Route("{stockId:length(40)}", Name = "PutStock")]
        public IHttpActionResult Put(string ownerId, string homeId, string containerId, string stockId, Stock stock)
        {
            var service = new OwnerHomeContainerStockService(ownerId, homeId, containerId, stockId);
            return Ok(service.Update(stock));
        }

        [Route("{stockId:length(40)}", Name = "DeleteStock")]
        public void Delete(string ownerId, string homeId, string containerId, string stockId)
        {
            new OwnerHomeContainerStockService(ownerId, homeId, containerId, stockId).Delete();
        }
    }
}
