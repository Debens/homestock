using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Exceptions
{
    public class EntityDoesNotExistException : Exception
    {
        public readonly string EntityId;

        public EntityDoesNotExistException(string message, string entityId) : base(message)
        {
            EntityId = entityId;
        }
    }
}