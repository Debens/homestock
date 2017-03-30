using System.Runtime.Serialization;
using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Suppliers.Base.WebAPI;

namespace HomeStockLibrary.Data.Suppliers
{
    [DataContract]
    public class EndPointFragment : HomeStockValidatble, IEndPointFragment
    {
        [DataMember(Name = "entity")]
        public string Entity { get; set; }

        [DataMember(Name = "identifierField")]
        public string IdentifierField { get; set; }

        public override void ValidateProperties()
        {
            Validate(Entity, "Entity");
            Validate(IdentifierField, "IdentifierField");
        }
    }
}
