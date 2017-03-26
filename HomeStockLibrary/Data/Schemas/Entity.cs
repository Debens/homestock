using HomeStockLibrary.Data.Schemas.Core;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Web.UI;
using HomeStockLibrary.Core;

namespace HomeStockLibrary.Data.Schemas
{
    [DataContract]
    public class Entity : HomeStockValidatble, IEntity
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "columns"), PersistenceMode(PersistenceMode.InnerProperty)]
        public List<Column> Columns { get; set; }

        public override void ValidateProperties() {
            Validate(Name, "Name");
            foreach (var column in Columns)
                column.ValidateProperties();
        }
    }
}
