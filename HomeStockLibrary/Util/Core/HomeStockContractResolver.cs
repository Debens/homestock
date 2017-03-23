using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Reflection;
using System.Collections;

namespace HomeStockLibrary.Util.Core
{
    public class HomeStockContractResolver : DefaultContractResolver
    {
        private Type contractType;
        private PropertyInfo[] contractProperties;

        public HomeStockContractResolver(Type contractType)
        {
            this.contractType = contractType;

            contractProperties = HomeStockObjectAssistant.GetPropertyInfoRecursively(this.contractType).ToArray();
        }

        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            var properties = base.CreateProperties(type, memberSerialization);
            IList<JsonProperty> runtimePropertiesInDataContract = properties.Where(p =>
                contractProperties.Any(cp => cp.Name == p.UnderlyingName && cp.PropertyType == p.PropertyType)).ToList();

            return runtimePropertiesInDataContract;
        }
    }
}
