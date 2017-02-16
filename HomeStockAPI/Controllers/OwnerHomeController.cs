using HomeStock.Model.External;
using HomeStock.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HomeStock.Controllers
{
    [RoutePrefix("api/owner/{ownerId}/home")]
    public class OwnerHomeController : ApiController
    {
        [Route("", Name = "PostHome")]
        public IHttpActionResult Post(int ownerId, Home home)
        {
            home.OwnerId = ownerId;
            home = OwnerHomeService.Create(home);
            return CreatedAtRoute("GetHome", new { ownerId = home.OwnerId, homeId = home.Id }, home);
        }

        [Route("", Name = "GetAllHomes")]
        public IHttpActionResult GetAll(int ownerId)
        {
            return Ok(OwnerHomeService.GetAll(ownerId));
        }

        [Route("{homeId:int}", Name = "GetHome")]
        public IHttpActionResult Get(int ownerId, int homeId)
        {
            var service = new OwnerHomeService(ownerId, homeId);
            return Ok(service.Get());
        }

        [Route("{homeId:int}", Name = "PutHome")]
        public IHttpActionResult Put(int ownerId, int homeId, Home home)
        {
            var service = new OwnerHomeService(ownerId, homeId);
            return Ok(service.Update(home));
        }

        [Route("{homeId:int}", Name = "DeleteHome")]
        public void Delete(int ownerId, int homeId)
        {
            new OwnerHomeService(ownerId, homeId).Delete();
        }
    }
}
