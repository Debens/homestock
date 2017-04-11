using System.Runtime.Serialization;
using HomeStockLibrary.Core;
using HomeStockLibrary.Controls.ClientControls.Archives.Base.WebAPI;

namespace HomeStockLibrary.Controls.ClientControls.Archives
{
    [DataContract]
    public class EndPointFragment : Validatble, IEndPointFragment
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
