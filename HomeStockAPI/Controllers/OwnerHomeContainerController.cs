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
    [RoutePrefix("api/owner/{ownerId:length(12)}/home/{homeId:length(12)}/container")]
    public class OwnerHomeContainerController : ApiController
    {
        [Route("", Name = "PostContainer")]
        public IHttpActionResult Post(string ownerId, string homeId, Container container)
        {
            container.HomeId = homeId;
            container = OwnerHomeContainerService.Create(container);
            return Ok(container);
            //return CreatedAtRoute("GetContainer", new { ownerId = container.Home.Owner.Id, homeId = container.Home.Id, containerId = container.Id }, container);
        }

        [Route("", Name = "GetAllContainers")]
        public IHttpActionResult GetAll(string ownerId, string homeId)
        {
            return Ok(OwnerHomeContainerService.GetAll(ownerId, homeId));
        }

        [Route("{containerId:length(12)}", Name = "GetContainer")]
        public IHttpActionResult Get(string ownerId, string homeId, string containerId)
        {
            var service = new OwnerHomeContainerService(ownerId, homeId, containerId);
            return Ok(service.Get());
        }

        [Route("{containerId:length(12)}", Name = "PutContainer")]
        public IHttpActionResult Put(string ownerId, string homeId, string containerId, Container container)
        {
            var service = new OwnerHomeContainerService(ownerId, homeId, containerId);
            return Ok(service.Update(container));
        }

        [Route("{containerId:length(12)}", Name = "DeleteContainer")]
        public void Delete(string ownerId, string homeId, string containerId)
        {
            new OwnerHomeContainerService(ownerId, homeId, containerId).Delete();
        }
    }
}
