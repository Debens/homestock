using System.Runtime.Serialization;
using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Archives.Base.WebAPI;

namespace HomeStockLibrary.Data.Archives
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
