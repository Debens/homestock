using HomeStockAPI.Model.External.Base;

namespace HomeStockAPI.Model.External
{
    public class Container : NamedEntity
    {
        public string HomeId { get; set; }
        public string Home { get; set; }
    }
}