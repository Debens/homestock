using HomeStockLibrary.Data.Schemas.Core;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Web.UI;
using HomeStockLibrary.Core;
using System.Linq;
using HomeStockLibrary.Exceptions;

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

            List<Column> idendityColumns = Columns.Where(c => c.IdentityColumn == true).ToList();
            if (idendityColumns.Count != 1)
                throw new HomeStockPropertyException("Entity '" + Name + "' must define an identiy column");
        }
    }
}
