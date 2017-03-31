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
    [RoutePrefix("api/owner/{ownerId:length(12)}/home")]
    public class OwnerHomeController : ApiController
    {
        [Route("", Name = "PostHome")]
        public IHttpActionResult Post(string ownerId, Home home)
        {
            home.OwnerId = ownerId;
            home = OwnerHomeService.Create(home);
            return Ok(home);
            //return CreatedAtRoute("GetHome", new { ownerId = home.OwnerId, homeId = home.Id }, home);
        }

        [Route("", Name = "GetAllHomes")]
        public IHttpActionResult GetAll(string ownerId)
        {
            return Ok(OwnerHomeService.GetAll(ownerId));
        }

        [Route("{homeId:length(12)}", Name = "GetHome")]
        public IHttpActionResult Get(string ownerId, string homeId)
        {
            var service = new OwnerHomeService(ownerId, homeId);
            return Ok(service.Get());
        }

        [Route("{homeId:length(12)}", Name = "PutHome")]
        public IHttpActionResult Put(string ownerId, string homeId, Home home)
        {
            var service = new OwnerHomeService(ownerId, homeId);
            return Ok(service.Update(home));
        }

        [Route("{homeId:length(12)}", Name = "DeleteHome")]
        public void Delete(string ownerId, string homeId)
        {
            new OwnerHomeService(ownerId, homeId).Delete();
        }
    }
}
