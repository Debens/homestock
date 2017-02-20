using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilesLibrary.Configuration.Base;

namespace WebFilesLibrary.Configuration
{
    public class BundleSource : ConfigurationElement, IBundleSource
    {
        [ConfigurationProperty("name", IsRequired = true)]
        public string Name
        {
            get { return (string)this["name"]; }
            set { this["name"] = value; }
        }

        [ConfigurationProperty("type", IsRequired = true)]
        public BundleType Type
        {
            get { return (BundleType)this["type"]; }
            set { this["type"] = value; }   
        }

        [ConfigurationProperty("folderSrc", IsRequired = true)]
        public string FolderSrc
        {
            get { return (string)this["folderSrc"]; }
            set { this["folderSrc"] = value; }
        }

        [ConfigurationProperty("filter")]
        public string Filter
        {
            get { return (string)this["filter"]; }
            set { this["filter"] = value; }
        }

        [ConfigurationProperty("includeSubFolders", DefaultValue = false)]
        public bool IncludeSubFolders
        {
            get { return (bool)this["includeSubFolders"]; }
            set { this["includeSubFolders"] = value; }
        }
    }
}
