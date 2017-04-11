namespace HomeStockLibrary.Controls.ClientControls.Schemas.Base
{
    public interface IColumn
    {
        string Name { get; set; }

        bool? IdentityColumn { get; set; }
    }
}
