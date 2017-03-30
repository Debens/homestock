using HomeStockLibrary.Data.Suppliers.Base;
using HomeStockLibrary.Data.Suppliers.Base.API;
using HomeStockLibrary.Util;
using System;
using System.Web.UI;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Data.Suppliers
{
    [Serializable, DataContract]
    public class API : BaseSupplier, IAPI
    {
        protected override string namespaceString { get { return "Data.Suppliers.WebAPI"; } }

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
            return HomeStockJsonAssistant.Convert(this, typeof(IAPI));
        }
    }
}