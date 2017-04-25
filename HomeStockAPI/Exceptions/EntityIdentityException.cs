using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Exceptions
{
    public class EntityIdentityException : Exception
    {
        public readonly string EntityId;

        public EntityIdentityException(string message) : base(message) { }

        public EntityIdentityException(string message, string entityId) : base(message)
        {
            EntityId = entityId;
        }
    }
}