using HomeStockLibrary.Configuration.Elements;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Configuration.ElementCollections
{
    [ConfigurationCollection(typeof(Column), AddItemName = "Column")]
    public class ColumnCollection : ConfigurationElementCollection, IEnumerable<Column>
    {
        protected override ConfigurationElement CreateNewElement()
        {
            return new Column();
        }

        protected override object GetElementKey(ConfigurationElement column)
        {
            return ((Column)column).Name;
        }

        IEnumerator<Column> IEnumerable<Column>.GetEnumerator()
        {
            return (from i in Enumerable.Range(0, this.Count)
                    select this[i])
                    .GetEnumerator();
        }

        public Column this[int index]
        {
            get
            {
                return BaseGet(index) as Column;
            }
        }
    }
}
