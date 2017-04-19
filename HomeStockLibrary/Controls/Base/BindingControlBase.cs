using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Controls.Base
{
    public abstract class BindingControlBase : WebControlBase
    {
        public string VMBinding { get; set; }

        public override void ValidateProperties()
        {
            Validate(VMBinding, "View Model Binding");
        }
    }
}
