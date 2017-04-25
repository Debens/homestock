using HomeStockAPI.Manager.Managers;
using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal;
using HomeStockAPI.Model.Mapping;
using HomeStockAPI.Repository;
using HomeStockAPI.Services;
using System.Web.Http;

namespace HomeStock.Controllers
{
    [RoutePrefix("api/owner/{ownerId:length(12)}/tag")]
    public class OwnerTagController : ApiController
    {
        protected Service<Tag, mTag, TagManager, TagRepository> service
        {
            get
            {
                return new Service<Tag, mTag, TagManager, TagRepository>()
                {
                    Manager = new TagManager()
                    {
                        Repository = new TagRepository(),
                        ParentMatch = (pId) => (t => t.OwnerId == pId)
                    },
                    Mapper = new TagMapping()
                };
            }
        }

        [Route("", Name = "PostTag")]
        public IHttpActionResult Post(string ownerId, Tag tag)
        {
            tag.OwnerId = ownerId;
            return Ok(service.Create(tag));
        }

        [Route("", Name = "GetAllTags")]
        public IHttpActionResult GetAll(string ownerId)
        {
            return Ok(service.GetAll(ownerId));
        }

        [Route("{tagId:length(12)}", Name = "GetTag")]
        public IHttpActionResult Get(string ownerId, string tagId)
        {
            return Ok(service.Get(tagId));
        }

        [Route("{tagId:length(12)}", Name = "PutTag")]
        public IHttpActionResult Put(string ownerId, string tagId, Tag tag)
        {
            tag.Id = tagId;
            tag.OwnerId = ownerId;
            return Ok(service.Update(tag));
        }

        [Route("{tagId:length(12)}", Name = "DeleteTag")]
        public void Delete(string ownerId, string tagId)
        {
            service.Delete(tagId);
        }
    }
}