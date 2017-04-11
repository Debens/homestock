using System.Collections.Generic;

namespace HomeStockLibrary.Controls.ClientControls.Schemas.Base
{
    public interface ISchema
    {
        string ID { get; set; }

        List<Entity> Entities { get; set; }
    }
}
