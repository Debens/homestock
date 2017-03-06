using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Core.Base
{
    public interface IValidatable
    {
        void ValidateProperties();

        void Validate(string value, string propertyName);

        void Validate(string value, string propertyName, string message);
    }
}
