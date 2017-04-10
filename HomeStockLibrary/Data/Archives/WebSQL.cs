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
        protected override string namespaceString { get { return "Data.Archives.WebSQL"; } }

        [DataMember(Name = "id")]
        public override string ID { get; set; }

        // TODO : Decided if this property if needed. Should Archives be one per table, or per schema?
        //[DataMember(Name = "tableName")]
        //public string TableName { get; set; }

        [DataMember(Name = "schemaId")]
        public string SchemaID { get; set; }

        public override void ValidateProperties()
        {
           // Validate(TableName, "TableName");
            Validate(SchemaID, "SchemaID");
        }

        public override string GenerateCreationString()
        {
            return HomeStockJsonAssistant.Convert(this, typeof(IWebSQL));
        }
    }
}
