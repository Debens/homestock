using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Schemas.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Data.Schemas
{
    public class Schema : HomeStockScriptObject, ISchema
    {
        public List<Entity> Entitiies { get; set; }

        public override string GenerateCreationString()
        {
            throw new NotImplementedException();
        }

        public override void ValidateProperties()
        {
            throw new NotImplementedException();
        }
    }
}
