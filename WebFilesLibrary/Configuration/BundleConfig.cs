using System.Configuration;

namespace WebFilesLibrary.Configuration
{
    public class BundleConfig : ConfigurationSection
    {
        public static BundleConfig GetConfig()
        {
            return (BundleConfig)ConfigurationManager.GetSection("BundleConfig");
        }

        [ConfigurationProperty("BundleCollections", IsRequired = true)]
        [ConfigurationCollection(typeof(BundleCollection),
        AddItemName = "Collection",
        ClearItemsName = "clear",
        RemoveItemName = "remove")]
        public BundleCollection BundleCollections
        {
            get
            {
                return (BundleCollection)base["BundleCollections"];
            }
            set
            {
                base["BundleCollections"] = value;
            }
        }
    }
}
