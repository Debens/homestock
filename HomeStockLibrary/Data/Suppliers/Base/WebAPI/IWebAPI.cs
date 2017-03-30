namespace HomeStockLibrary.Data.Suppliers.Base.WebAPI
{
    public interface IWebAPI : ISupplier
    {
        EndPoint EndPoint { get; set; }
    }
}
