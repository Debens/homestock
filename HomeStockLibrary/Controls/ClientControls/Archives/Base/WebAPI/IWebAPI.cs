namespace HomeStockLibrary.Controls.ClientControls.Archives.Base
{
    public interface IWebAPI : IArchive
    {
        EndPoint EndPoint { get; set; }
    }
}
