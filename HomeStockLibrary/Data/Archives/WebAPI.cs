using HomeStockLibrary.Data.Archives.Base;
using HomeStockLibrary.Data.Archives.Base.WebAPI;
using HomeStockLibrary.Util;
using System;
using System.Web.UI;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Data.Archives
{
    [Serializable, DataContract]
    public class WebAPI : BaseArchive, IWebAPI
    {
        protected override string namespaceString => "Data.Archives.WebAPI";

        protected override string CreationParameters => HomeStockJsonAssistant.Convert(this, typeof(IWebAPI));

        [DataMember(Name = "id")]
        public override string ID { get; set; }
        
        [DataMember(Name = "endPoint"), PersistenceMode(PersistenceMode.InnerProperty)]
        public EndPoint EndPoint { get; set; }

        public override void ValidateProperties()
        {
            EndPoint.ValidateProperties();
        }
    }
}