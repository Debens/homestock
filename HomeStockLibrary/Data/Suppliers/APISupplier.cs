using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Suppliers.Base;
using HomeStockLibrary.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Data.Suppliers
{
    [Serializable, DataContract]
    public class APISupplier : BaseSupplier, IAPISupplier
    {
        protected override string namespaceString { get { return "Data.Suppliers.WebAPI"; } }

        [DataMember(Name = "id")]
        public override string ID { get; set; }

        [DataMember(Name = "endPoint")]
        public string EndPoint { get; set; }

        [DataMember(Name = "schemaId")]
        public string SchemaID { get; set; }

        public override void ValidateProperties()
        {
            Validate(EndPoint, "Endpoint");
            Validate(SchemaID, "SchemaID");
        }

        public override string GenerateCreationString()
        {
            return HomeStockJsonAssistant.Convert(this, typeof(IAPISupplier));
        }
    }
}