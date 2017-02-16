using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Exceptions
{
    public class EntityDoesNotExistException : Exception
    {
        public readonly int EntityId;

        public EntityDoesNotExistException(string message, int entityId) : base(message)
        {
            EntityId = entityId;
        }
    }
}