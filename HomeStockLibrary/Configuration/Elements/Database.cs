using HomeStockLibrary.Configuration.ElementCollections;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Configuration.Elements
{
    public class Database : ConfigurationElement
    {
        [ConfigurationProperty("name", IsKey = true, IsRequired = true)]
        public string Name
        {
            get { return (string)base["name"]; }
            set { base["name"] = value; }
        }

        [ConfigurationProperty("Tables", IsRequired = true)]
        public TableCollection Tables
        {
            get { return (TableCollection)base["Tables"]; }
            set { base["Tables"] = value; }
        }
    }
}
