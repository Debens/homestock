using HomeStockLibrary.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Cache
{
    public class SmartCache<TKey, TValue> : Cache<TKey, TValue>
    {
        private Func<TKey, TValue> accessor { get; set; }

        public SmartCache(Func<TKey, TValue> accessor) : base() {
            this.accessor = accessor;
        }

        public override TValue this[TKey key] {
            get {
                if (HasCached(key))
                    return cache[key];
                else
                {
                    TValue value = accessor(key);
                    if (value == null)
                        throw new HomeStockException("Cache accessor function failed to return a value");

                    cache.Add(key, value);
                    return value;
                }
            } 
        }
    }
}
