using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using HomeStockLibrary.Data.Archives.Base;
using HomeStockLibrary.Data.Archives.Base.WebSQL;
using HomeStockLibrary.Util;

namespace HomeStockLibrary.Data.Archives
{
    [Serializable, DataContract]
    public class WebSQL : BaseArchive, IWebSQL
    {
        protected override string namespaceString => "Data.Archives.WebSQL";

        protected override string CreationParameters => HomeStockJsonAssistant.Convert(this, typeof(IWebSQL));
    }
}
