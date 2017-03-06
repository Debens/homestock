using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Suppliers.Base;
using HomeStockLibrary.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Data.Suppliers
{
    public class APISupplier : BaseSupplier, IAPISupplier
    {
        public string EndPoint { get; set; }

        public override void ValidateProperties()
        {
            Validate(EndPoint, "Endpoint");
        }

        public override string GenerateCreationString()
        {
            return string.Format("var {0} = {1};", this.ID, HomeStockJsonAssistant.Convert(this, typeof(IAPISupplier)));
        }
    }
}
