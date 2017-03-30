using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Suppliers.Base.API;

namespace HomeStockLibrary.Data.Suppliers
{
    [DataContract]
    public class EndPoint : HomeStockValidatble, IEndPoint
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
            
            string.Format(Url, EndPointFragments.Select(f => f.Entity)); // Test expected use case
        }
    }
}
