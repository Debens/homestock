using HomeStockAPI.Managers;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping;
using HomeStockAPI.Repository;
using HomeStockAPI.Services;
using System.Web.Http;

namespace HomeStock.Controllers
{
    [RoutePrefix("api/owner")]
    public class OwnerController : ApiController
    {
        protected Service<Owner, mOwner, OwnerManager, OwnerRepository> service
        {
            get
            {
                return new Service<Owner, mOwner, OwnerManager, OwnerRepository>()
                {
                    Manager = new OwnerManager()
                    {
                        Repository = new OwnerRepository()
                    },
                    Mapper = new OwnerMapping()
                };
            }
        }

        [Route("", Name = "PostOwner")]
        public IHttpActionResult Post(Owner owner)
        {
            return Ok(service.Create(owner));
            //turn CreatedAtRoute("GetOwner", new { ownerId = newOwner.Id }, newOwner);
        }

        [Route("", Name = "GetAllOwners")]
        public IHttpActionResult GetAll()
        {
            return Ok(service.GetAll());
        }

        [Route("{ownerId:length(12)}", Name = "GetOwner")]
        public IHttpActionResult Get(string ownerId)
        {
            return Ok(service.Get(ownerId));
        }

        [Route("{ownerId:length(12)}", Name = "PutOwner")]
        public IHttpActionResult Put(string ownerId, Owner owner)
        {
            owner.Id = ownerId;
            return Ok(service.Update(owner));
        }

        [Route("{ownerId:length(12)}", Name = "DeleteOwner")]
        public void Delete(string ownerId)
        {
            service.Delete(ownerId);
        }
    }
}
