using System.Configuration;
using WebFilesLibrary.Configuration.Base;

namespace WebFilesLibrary.Configuration
{
    public class Bundle : ConfigurationElement, IBundle
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

        [ConfigurationProperty("filter", IsRequired = true, DefaultValue = "*")]
        public string Filter
        {
            get { return (string)this["filter"]; }
            set { this["filter"] = value; }
        }

        [ConfigurationProperty("outputFolder", IsRequired = true)]
        public string OutputFolder
        {
            get
            {
                string folderDir = (string)base["outputFolder"];
                if (!folderDir.EndsWith("/"))
                    folderDir += "/";
                return folderDir;
            }
            set
            {
                base["outputFolder"] = value;
            }
        }

        [ConfigurationProperty("Bundles", IsRequired = true)]
        [ConfigurationCollection(typeof(BundleSourceCollection),
        AddItemName = "Bundle",
        ClearItemsName = "clear",
        RemoveItemName = "remove")]
        public BundleSourceCollection Bundles
        {
            get
            {
                return (BundleSourceCollection)base["Bundles"];
            }
            set
            {
                base["Bundles"] = value;
            }
        }
    }
}
