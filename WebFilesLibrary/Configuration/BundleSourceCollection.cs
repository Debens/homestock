using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilesLibrary.Configuration
{
    public class BundleSourceCollection : ConfigurationElementCollection
    {
        protected override ConfigurationElement CreateNewElement()
        {
            return new BundleSource();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((BundleSource)element).Name;
        }
        
        public BundleSource this[int index]
        {
            get
            {
                return (BundleSource)BaseGet(index);
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

        new public BundleSource this[string Name]
        {
            get
            {
                return (BundleSource)BaseGet(Name);
            }
        }

        public int IndexOf(BundleSource bundleSource)
        {
            return BaseIndexOf(bundleSource);
        }

        public void Add(BundleSource bundleSource)
        {
            BaseAdd(bundleSource);
        }
        protected override void BaseAdd(ConfigurationElement element)
        {
            BaseAdd(element, false);
        }

        public void Remove(BundleSource bundleSource)
        {
            if (BaseIndexOf(bundleSource) >= 0)
                BaseRemove(bundleSource.Name);
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
