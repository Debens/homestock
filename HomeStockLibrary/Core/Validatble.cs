using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HomeStockLibrary.Core.Base;
using HomeStockLibrary.Exceptions;

namespace HomeStockLibrary.Core
{
    public class Validatble : IValidatable
    {
        public virtual void ValidateProperties() { /*Can be overriden such that it can be called by other classes, not enforced*/ }
        
        public virtual string ID { get; set; }

        public void Validate(string value, string propertyName)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
                throwError(propertyName);
        }

        public void Validate(string value, string propertyName, string message)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
                throwError(propertyName, message);
        }

        public void Validate(string value, Exception exception)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
                throw exception;
        }

        private void throwError(string propertyName)
        {
            throw new HomeStockPropertyException(string.Format("Property '{0}' is required for {1} with ID '{2}'", propertyName, this.GetType(), this.ID));
        }

        private void throwError(string propertyName, string message)
        {
            throw new HomeStockPropertyException(string.Format("Property '{0}' is required for {1} with ID '{2}', {3}", propertyName, this.GetType(), this.ID, message));
        }
    }
}
