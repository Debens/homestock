namespace HomeStockLibrary.Data.Archives.Base.WebAPI
{
    public interface IWebAPI : IArchive
    {
        EndPoint EndPoint { get; set; }
    }
}
