using HomeStock.Model.External.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.External
{
    public class Container : NamedEntity
    {
        public int HomeId { get; set; }
        public string Home { get; set; }
    }
}