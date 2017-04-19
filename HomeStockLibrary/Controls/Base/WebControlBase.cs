using HomeStockLibrary.Core.Base;
using HomeStockLibrary.Exceptions;
using System.Web.UI;
using System.Web.UI.WebControls;
using System;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Controls.Base
{
    [DataContract]
    public abstract class WebControlBase : WebControl, IValidatable
    {
        [DataMember(Name = "id")]
        public override string ID { get; set; }

        [IgnoreDataMember]
        public string BlendColour { get { return _blendColour ?? "var(--HS-Background)"; } set { _blendColour = value; } } // TODO: Config default blend colour
        private string _blendColour;

        protected abstract override void Render(HtmlTextWriter writer);

        public abstract void ValidateProperties();

        public override void RenderControl(HtmlTextWriter writer)
        {
            ValidateProperties();
            Render(writer);
        }
        
        public void Validate(string value, string propertyName)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
                throwError(propertyName);
        }

        public void Validate(string value, string propertyName, string message)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
                throwError(propertyName, message);
        }

        public void Validate(string value, Exception exception)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
                throw exception;
        }

        private void throwError(string propertyName)
        {
            throw new HomeStockException(string.Format("Property '{0}' is required for {1} with ID '{2}'", propertyName, this.GetType(), this.ID));
        }

        private void throwError(string propertyName, string message)
        {
            throw new HomeStockException(string.Format("Property '{0}' is required for {1} with ID '{2}', {3}", propertyName, this.GetType(), this.ID, message));
        }
    }
}
