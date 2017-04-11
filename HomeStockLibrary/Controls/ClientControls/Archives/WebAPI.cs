using System;
using System.Web.UI;
using System.Runtime.Serialization;
using HomeStockLibrary.Util;
using HomeStockLibrary.Controls.ClientControls.Archives.Base;

namespace HomeStockLibrary.Controls.ClientControls.Archives
{
    [Serializable, DataContract]
    public class WebAPI : BaseArchive, IWebAPI
    {
        protected override string namespaceString => "Data.Archives.WebAPI";

        protected override string CreationParameters => JsonAssistant.Convert(this, typeof(IWebAPI));

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