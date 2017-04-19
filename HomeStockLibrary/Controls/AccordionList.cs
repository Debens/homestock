using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Controls.Templates.Core;
using HomeStockLibrary.Util;
using System.IO;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace HomeStockLibrary.Controls
{
    public class AccordionList : WebControlBase, INamingContainer
    {
        public AccordionList()
        {
            BlendColour = "#FFF";
        }

        [TemplateContainer(typeof(AccordionList)), PersistenceMode(PersistenceMode.InnerProperty)]
        public virtual ITemplate Content { get; set; }
        protected virtual string ContentHTML
        {
            get
            {
                var writer = new HtmlTextWriter(new StringWriter());
                if (Content != null)
                {
                    var control = new HtmlGenericControl("span");
                    Content.InstantiateIn(control);
                    ControlAssistant.CascadeBlendColour(control, BlendColour);
                    control.RenderControl(writer);
                }

                return writer.InnerWriter.ToString();
            }
        }

        protected override void Render(HtmlTextWriter writer)
        {
            Templator pageHeader = Templator.Load("AccordionList.html").Process(this);
            writer.Write(pageHeader.ToString());
        }

        public override void ValidateProperties()
        {
            Validate(ContentHTML, "Content");
        }
    }
}