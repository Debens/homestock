//using HomeStock.Model.External;
//using HomeStock.Services;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Http;

//namespace HomeStock.Controllers
//{
//    [RoutePrefix("api/owner/{ownerId:length(12)}/tag")]
//    public class OwnerTagController : ApiController
//    {
//        [Route("", Name = "PostTag")]
//        public IHttpActionResult Post(string ownerId, Tag tag)
//        {
//            tag.OwnerId = ownerId;
//            tag = OwnerTagService.Create(tag);
//            return Ok(tag);
//        }

//        [Route("", Name = "GetAllTags")]
//        public IHttpActionResult GetAll(string ownerId)
//        {
//            return Ok(OwnerTagService.GetAll(ownerId));
//        }

//        [Route("{tagId:length(12)}", Name = "GetTag")]
//        public IHttpActionResult Get(string ownerId, string tagId)
//        {
//            var service = new OwnerTagService(ownerId, tagId);
//            return Ok(service.Get());
//        }

//        [Route("{tagId:length(12)}", Name = "PutTag")]
//        public IHttpActionResult Put(string ownerId, string tagId, Tag tag)
//        {
//            var service = new OwnerTagService(ownerId, tagId);
//            return Ok(service.Update(tag));
//        }

//        [Route("{tagId:length(12)}", Name = "DeleteTag")]
//        public void Delete(string ownerId, string tagId)
//        {
//            new OwnerTagService(ownerId, tagId).Delete();
//        }
//    }
//}