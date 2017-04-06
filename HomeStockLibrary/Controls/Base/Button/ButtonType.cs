using HomeStockLibrary.Controls.Base.Attributes;

namespace HomeStockLibrary.Controls.Base.Button
{
    public enum ButtonType
    {
        [Styling(ClassName = "hs-button-default")]
        Default,

        [Styling(ClassName = "hs-button-new")]
        New,

        [Styling(ClassName = "hs-button-delete")]
        Delete
    }
}
