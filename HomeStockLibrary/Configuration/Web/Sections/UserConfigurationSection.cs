using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Configuration.Web.Sections
{
    class UserConfigurationSection : ConfigurationSection
    {
        public UserConfigurationSection GetConfiguration()
        {
            return ConfigurationManager.GetSection("userConfig") as UserConfigurationSection;
        }

        [ConfigurationProperty("id", IsRequired = true)]
        public int Id
        {
            get
            {
                return (int)this["id"];
            }
            set
            {
                this["id"] = value;
            }
        }
    }
}
