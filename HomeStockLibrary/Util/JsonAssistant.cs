using HomeStockLibrary.Util.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace HomeStockLibrary.Util
{
    public class JsonAssistant
    {
        public static string Convert(Object obj, Type type)
        {
            var settings = new JsonSerializerSettings()
            {
                ContractResolver = new DataMemberContractResolver(type)
            };

            return JsonConvert.SerializeObject(obj, settings) ;
        }
    }
}
