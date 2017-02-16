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
    [RoutePrefix("api/owner/{ownerId}/home/{homeId}/container")]
    public class OwnerHomeContainerController : ApiController
    {
        [Route("", Name = "PostContainer")]
        public IHttpActionResult Post(int ownerId, int homeId, Container container)
        {
            container.HomeId = homeId;
            container = OwnerHomeContainerService.Create(container);
            return Ok(container);
            //return CreatedAtRoute("GetContainer", new { ownerId = container.Home.Owner.Id, homeId = container.Home.Id, containerId = container.Id }, container);
        }

        [Route("", Name = "GetAllContainers")]
        public IHttpActionResult GetAll(int ownerId, int homeId)
        {
            return Ok(OwnerHomeContainerService.GetAll(ownerId, homeId));
        }

        [Route("{containerId:int}", Name = "GetContainer")]
        public IHttpActionResult Get(int ownerId, int homeId, int containerId)
        {
            var service = new OwnerHomeContainerService(ownerId, homeId, containerId);
            return Ok(service.Get());
        }

        [Route("{containerId:int}", Name = "PutContainer")]
        public IHttpActionResult Put(int ownerId, int homeId, int containerId, Container container)
        {
            var service = new OwnerHomeContainerService(ownerId, homeId, containerId);
            return Ok(service.Update(container));
        }

        [Route("{containerId:int}", Name = "DeleteContainer")]
        public void Delete(int ownerId, int homeId, int containerId)
        {
            new OwnerHomeContainerService(ownerId, homeId, containerId).Delete();
        }
    }
}
