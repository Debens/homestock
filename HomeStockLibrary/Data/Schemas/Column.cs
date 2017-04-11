using HomeStockLibrary.Data.Schemas.Core;
using System.Runtime.Serialization;
using HomeStockLibrary.Core;

namespace HomeStockLibrary.Data.Schemas
{
    [DataContract]
    public class Column : Validatble, IColumn
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "identityColumn")]
        public bool? IdentityColumn { get; set; }

        public override void ValidateProperties()
        {
            Validate(Name, "Name");
        }
    }
}
