using System.Collections.Generic;

namespace HomeStockLibrary.Controls.ClientControls.Schemas.Base
{
    public interface IEntity
    {
        string Name { get; set; }

        string IdentityPrefix { get; set; }

        int IdentityLength { get; set; }

        List<Column> Columns { get; set; }
    }
}
