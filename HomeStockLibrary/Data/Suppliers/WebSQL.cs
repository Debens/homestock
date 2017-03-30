using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using HomeStockLibrary.Data.Suppliers.Base;
using HomeStockLibrary.Data.Suppliers.Base.WebAPI;
using HomeStockLibrary.Util;

namespace HomeStockLibrary.Data.Suppliers
{
    [Serializable, DataContract]
    public class WebSQL : BaseSupplier, IWebSQLSupplier
    {
        protected override string namespaceString { get { return "Data.Suppliers.WebAPI"; } }

        [DataMember(Name = "id")]
        public override string ID { get; set; }

        [DataMember(Name = "tableName")]
        public string TableName { get; set; }

        [DataMember(Name = "schemaId")]
        public string SchemaID { get; set; }

        public override void ValidateProperties()
        {
            Validate(TableName, "TableName");
            Validate(SchemaID, "SchemaID");
        }

        public override string GenerateCreationString()
        {
            return HomeStockJsonAssistant.Convert(this, typeof(IWebAPI));
        }
    }
}
