using HomeStockLibrary.Util;
using System.Web.UI;
using System;

namespace HomeStockLibrary.Controls.Base.Button
{
    public abstract class ButtonBase : HomeStockControlBase, IButton
    {
        public string Text { get; set; }

        public ButtonType Type { get; set; }

        public abstract void RenderButtonAttributes(HtmlTextWriter writer);

        protected override void Render(HtmlTextWriter writer)
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
            
            Styling attribute = EnumHelper.GetAttributeOfType<Styling>(type);
            string cssClass = attribute.ClassName;

            return baseButtonClass + " " + cssClass;
        }

        public override void ValidateProperties()
        {
            Validate(Text, "Text");
        }
    }
}
