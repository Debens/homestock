using System;
using System.Runtime.Serialization;
using HomeStockLibrary.Util;
using HomeStockLibrary.Controls.ClientControls.Archives.Base;
using HomeStockLibrary.Controls.ClientControls.Archives.Base.WebSQL;

namespace HomeStockLibrary.Controls.ClientControls.Archives
{
    [Serializable, DataContract]
    public class WebSQL : BaseArchive, IWebSQL
    {
        protected override string namespaceString => "Data.Archives.WebSQL";

        protected override string CreationParameters => JsonAssistant.Convert(this, typeof(IWebSQL));
    }
}
