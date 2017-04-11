using HomeStockLibrary.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Cache
{
    public class Cache<TKey, TValue>
    {
        protected Dictionary<TKey, TValue> cache { get; set; }

        public Cache()
        {
            cache = new Dictionary<TKey, TValue>();
        }

        public virtual TValue this[TKey key]
        {
            get
            {
                if (HasCached(key))
                    return cache[key];
                else
                    throw new KeyNotFoundException("Cache does not define a value under the given key");
            }
            set
            {
                cache.Add(key, value);
            }
        }

        public virtual void Clear()
        {
            cache.Clear();
        }

        public virtual bool HasCached(TKey key)
        {
            TValue value;
            return cache.TryGetValue(key, out value);
        }
    }
}
