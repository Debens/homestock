namespace HomeStockLibrary.Controls.Base
{
    public interface IValidatable
    {
        void Validate(string value, string propertyName);

        void Validate(string value, string propertyName, string message);
    }
}
