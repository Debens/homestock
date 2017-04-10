namespace HomeStockLibrary.Data.Archives.Base
{
    public interface IWebAPI : IArchive
    {
        EndPoint EndPoint { get; set; }
    }
}
