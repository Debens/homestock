namespace HomeStockLibrary.Data.Suppliers.Base.API
{
    public interface IAPI : ISupplier
    {
        EndPoint EndPoint { get; set; }
    }
}
