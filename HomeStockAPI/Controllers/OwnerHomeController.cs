using HomeStockAPI.Managers;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping;
using HomeStockAPI.Repository;
using HomeStockAPI.Services;
using System.Web.Http;

namespace HomeStock.Controllers
{
    [RoutePrefix("api/owner/{ownerId:length(12)}/home")]
    public class OwnerHomeController : ApiController
    {
        protected Service<Home, mHome, HomeManager, HomeRepository> service
        {
            get
            {
                return new Service<Home, mHome, HomeManager, HomeRepository>()
                {
                    Manager = new HomeManager()
                    {
                        Repository = new HomeRepository()
                    },
                    Mapper = new HomeMapping()
                };
            }
        }

        [Route("", Name = "PostHome")]
        public IHttpActionResult Post(string ownerId, Home home)
        {
            home.OwnerId = ownerId;
            return Ok(service.Create(home));
            //return CreatedAtRoute("GetHome", new { ownerId = home.OwnerId, homeId = home.Id }, home);
        }

        [Route("", Name = "GetAllHomes")]
        public IHttpActionResult GetAll(string ownerId)
        {
            return Ok(service.GetAll(ownerId));
        }

        [Route("{homeId:length(12)}", Name = "GetHome")]
        public IHttpActionResult Get(string ownerId, string homeId)
        {
            Home home = service.Get(homeId);
            return Ok(home);
        }

        [Route("{homeId:length(12)}", Name = "PutHome")]
        public IHttpActionResult Put(string ownerId, string homeId, Home home)
        {
            home.Id = homeId;
            home.OwnerId = ownerId;
            return Ok(service.Update(home));
        }

        [Route("{homeId:length(12)}", Name = "DeleteHome")]
        public void Delete(string ownerId, string homeId)
        {
            service.Delete(homeId);
        }
    }
}
