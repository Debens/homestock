using System.Configuration;

namespace WebFilesLibrary.Configuration
{
    public class BundleConfig : ConfigurationSection
    {
        public static BundleConfig GetConfig()
        {
            return (BundleConfig)ConfigurationManager.GetSection("BundleConfig");
        }

        [ConfigurationProperty("BundleSources", IsRequired = true)]
        [ConfigurationCollection(typeof(BundleSourceCollection),
        AddItemName = "add",
        ClearItemsName = "clear",
        RemoveItemName = "remove")]
        public BundleSourceCollection BundleSources
        {
            get
            {
                return (BundleSourceCollection)base["BundleSources"];
            }
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
    }
}
