using HomeStockLibrary.Configuration.Elements;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Configuration.Sections
{
    public class HomeStockConfiguration : ConfigurationSection
    {
        public static HomeStockConfiguration GetConfig()
        {
            return (HomeStockConfiguration)ConfigurationManager.GetSection("HomeStockConfiguration");
        }

        [ConfigurationProperty("Database")]
        [ConfigurationCollection(typeof(Database))]
        public Database Database
        {
            get { return (Database)base["Database"]; }
            set { base["Database"] = value; }
        }
    }
}
