﻿using HomeStock.Data;
using HomeStock.Model.External;
using HomeStock.Model.Internal;
using HomeStock.Services;
using OwnerStock.Model.MappingExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HomeStock.Controllers
{
    [RoutePrefix("api/owner")]
    public class OwnerController : ApiController
    {
        [Route("", Name = "PostOwner")]
        public IHttpActionResult Post(Owner owner)
        {
            Owner newOwner = OwnerService.Create(owner);
            return CreatedAtRoute("GetOwner", new { ownerId = owner.Id }, newOwner);
        }

        [Route("", Name = "GetAllOwners")]
        public IHttpActionResult GetAll()
        {
            return Ok(OwnerService.GetAll());
        }

        [Route("{ownerId:length(12)}", Name = "GetOwner")]
        public IHttpActionResult /*HttpResponseMessage*/ Get(string ownerId)
        {
            var service = new OwnerService(ownerId);
            return Ok(service.Get());
           // return Request.CreateResponse(HttpStatusCode.OK, service.Get());
        }

        [Route("{ownerId:length(12)}", Name = "PutOwner")]
        public IHttpActionResult Put(string ownerId, Owner owner)
        {
            var service = new OwnerService(ownerId);
            return Ok(service.Update(owner));
        }

        [Route("{ownerId:length(12)}", Name = "DeleteOwner")]
        public void Delete(string ownerId)
        {
            new OwnerService(ownerId).Delete();
        }
    }
}
