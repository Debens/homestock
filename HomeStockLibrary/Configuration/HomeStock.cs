using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Configuration
{
    public class HomeStock : ConfigurationSection
    {
        public static HomeStock GetConfig()
        {
            return (HomeStock)ConfigurationManager.GetSection("HomeStockConfig");
        }
        
        [ConfigurationProperty("version", IsRequired = true)]
        public string Version
        {
            get { return (string)this["version"]; }
        }
    }
}
