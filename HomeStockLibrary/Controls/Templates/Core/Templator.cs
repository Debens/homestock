using HomeStockLibrary.Controls.Resources.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Templates.Core
{
    public class Templator
    {
        protected string template { get; set; }
        protected string content { get; set; }

        public Templator(string template) { this.template = template;  }

        public static Templator Load(string templateFileName) {
            string template = ResourceLoader.LoadTempalte(templateFileName);
            return new Templator(template);
        }

        public Templator Process(object pattern)
        {
            // TODO: process the template against the pattern.

            return this;
        }

        public override string ToString()
        {
            return content ?? template;
        }
    }
}
