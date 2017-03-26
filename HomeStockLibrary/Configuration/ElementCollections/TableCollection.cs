using HomeStockLibrary.Configuration.Elements;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Configuration.ElementCollections
{
    [ConfigurationCollection(typeof(Table), AddItemName = "Table")]
    public class TableCollection : ConfigurationElementCollection, IEnumerable<Table>
    { 
        protected override ConfigurationElement CreateNewElement()
        {
            return new Table();
        }

        protected override object GetElementKey(ConfigurationElement table)
        {
            return ((Table)table).Name;
        }

        IEnumerator<Table> IEnumerable<Table>.GetEnumerator()
        {
            return (from i in Enumerable.Range(0, this.Count)
                    select this[i])
                    .GetEnumerator();
        }

        public Table this[int index]
        {
            get
            {
                return BaseGet(index) as Table;
            }
        }
    }
}
