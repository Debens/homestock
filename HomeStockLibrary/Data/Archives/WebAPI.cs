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
        protected override string namespaceString { get { return "Data.Archives.WebAPI"; } }

        [DataMember(Name = "id")]
        public override string ID { get; set; }
        
        [DataMember(Name = "endPoint"), PersistenceMode(PersistenceMode.InnerProperty)]
        public EndPoint EndPoint { get; set; }

        public override void ValidateProperties()
        {
            EndPoint.ValidateProperties();
            Validate(SchemaID, "SchemaID");
        }

        public override string GenerateCreationString()
        {
            return HomeStockJsonAssistant.Convert(this, typeof(IWebAPI));
        }
    }
}