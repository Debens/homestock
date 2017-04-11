using System.Linq;
using System.Collections.Generic;
using System.Runtime.Serialization;
using HomeStockLibrary.Core;
using HomeStockLibrary.Controls.ClientControls.Archives.Base.WebAPI;

namespace HomeStockLibrary.Controls.ClientControls.Archives
{
    [DataContract]
    public class EndPoint : Validatble, IEndPoint
    {
        [DataMember(Name = "url")]
        public string Url { get; set; }

        [DataMember(Name = "endPointFragments")]
        public List<EndPointFragment> EndPointFragments { get; set; }

        public override void ValidateProperties()
        {
            foreach (var fragment in EndPointFragments)
                fragment.ValidateProperties();
            Validate(Url, "Url");

            var entities = EndPointFragments.Select(f => f.Entity);
            string.Format(Url, EndPointFragments.Select(f => f.Entity).ToArray()); // Test expected use case
        }
    }
}
