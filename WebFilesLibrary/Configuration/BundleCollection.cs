using System.Configuration;
namespace WebFilesLibrary.Configuration
{
    public class BundleCollection : ConfigurationElementCollection
    {
        protected override ConfigurationElement CreateNewElement()
        {
            return new Bundle();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((Bundle)element).Name;
        }

        public Bundle this[int index]
        {
            get
            {
                return (Bundle)BaseGet(index);
            }
            set
            {
                if (BaseGet(index) != null)
                {
                    BaseRemoveAt(index);
                }
                BaseAdd(index, value);
            }
        }

        new public Bundle this[string Name]
        {
            get
            {
                return (Bundle)BaseGet(Name);
            }
        }

        public int IndexOf(Bundle Bundle)
        {
            return BaseIndexOf(Bundle);
        }

        public void Add(Bundle Bundle)
        {
            BaseAdd(Bundle);
        }
        protected override void BaseAdd(ConfigurationElement element)
        {
            BaseAdd(element, false);
        }

        public void Remove(Bundle Bundle)
        {
            if (BaseIndexOf(Bundle) >= 0)
                BaseRemove(Bundle.Name);
        }

        public void RemoveAt(int index)
        {
            BaseRemoveAt(index);
        }

        public void Remove(string Name)
        {
            BaseRemove(Name);
        }

        public void Clear()
        {
            BaseClear();
        }
    }
}
