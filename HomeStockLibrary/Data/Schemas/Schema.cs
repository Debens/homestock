using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Schemas.Core;
using System.Collections.Generic;
using System.Web.UI;
using System.Runtime.Serialization;
using HomeStockLibrary.Util;

namespace HomeStockLibrary.Data.Schemas
{
    [DataContract]
    public class Schema : HomeStockScriptObject, ISchema
    {
        [DataMember(Name = "entities"), PersistenceMode(PersistenceMode.InnerProperty)]
        public List<Entity> Entitiies { get; set; }

        public override string GenerateCreationString()
        {
            return HomeStockJsonAssistant.Convert(this, typeof(ISchema));
        }

        public override void ValidateProperties()
        {
            Validate(ID, "ID");
            foreach (var entity in Entitiies)
                entity.ValidateProperties();
        }
    }
}
