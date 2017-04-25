using HomeStockAPI.Managers;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping;
using HomeStockAPI.Repository;
using HomeStockAPI.Services;
using System.Web.Http;

namespace ContainerStock.Controllers
{
    [RoutePrefix("api/owner/{ownerId:length(12)}/home/{homeId:length(12)}/container")]
    public class OwnerHomeContainerController : ApiController
    {
        protected Service<Container, mContainer, ContainerManager, ContainerRepository> service
        {
            get
            {
                return new Service<Container, mContainer, ContainerManager, ContainerRepository>()
                {
                    Manager = new ContainerManager()
                    {
                        Repository = new ContainerRepository(),
                        ParentMatch = (pId) => (c => c.HomeId == pId)
                    },
                    Mapper = new ContainerMapping()
                };
            }
        }

        [Route("", Name = "PostContainer")]
        public IHttpActionResult Post(string ownerId, string homeId, Container container)
        {
            container.HomeId = homeId;
            return Ok(service.Create(container));
            //return CreatedAtRoute("GetContainer", new { ownerId = container.Home.Owner.Id, homeId = container.Home.Id, containerId = container.Id }, container);
        }

        [Route("", Name = "GetAllContainers")]
        public IHttpActionResult GetAll(string ownerId, string homeId)
        {
            return Ok(service.GetAll(homeId));
        }

        [Route("{containerId:length(12)}", Name = "GetContainer")]
        public IHttpActionResult Get(string ownerId, string homeId, string containerId)
        {
            return Ok(service.Get(containerId));
        }

        [Route("{containerId:length(12)}", Name = "PutContainer")]
        public IHttpActionResult Put(string ownerId, string homeId, string containerId, Container container)
        {
            container.Id = containerId;
            container.HomeId = homeId;
            return Ok(service.Update(container));
        }

        [Route("{containerId:length(12)}", Name = "DeleteContainer")]
        public void Delete(string ownerId, string homeId, string containerId)
        {
            service.Delete(containerId);
        }
    }
}
