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
    }
}
