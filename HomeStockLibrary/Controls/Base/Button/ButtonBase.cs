using HomeStockLibrary.Util;
using System.Web.UI;

namespace HomeStockLibrary.Controls.Base.Button
{
    public abstract class ButtonBase : HomeStockControlBase, IButton
    {
        public string Text { get; set; }

        public ButtonType Type { get; set; }

        public abstract void RenderButtonAttributes(HtmlTextWriter writer);

        public override void RenderControl(HtmlTextWriter writer)
        {
            writer.AddAttribute("ID", ID);
           
            writer.AddAttribute("class", getCssClasses(Type));

            RenderButtonAttributes(writer);
            writer.RenderBeginTag("a");

            writer.InnerWriter.Write(string.Format("{0}", Text));
            
            writer.RenderEndTag();
        }

        protected string getCssClasses(ButtonType type)
        {
            string baseButtonClass = "hs-button";
            
            ButtonAttribute attribute = EnumHelper.GetAttributeOfType<ButtonAttribute>(type);
            string backgroundClass = attribute.BackgroundColor;

            return baseButtonClass + " " + backgroundClass;
        }
    }
}
