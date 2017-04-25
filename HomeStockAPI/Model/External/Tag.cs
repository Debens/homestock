using HomeStockAPI.Model.External.Base;

namespace HomeStockAPI.Model.External
{
    public class Tag : NamedEntity
    {
        public string OwnerId { get; set; }
        public string Owner { get; set; }
    }
}