using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilesLibrary.Configuration.Base
{
    interface IBundle
    {
        string Name { get; set; }

        BundleType Type { get; set; }

        string Filter { get; set; }
    }
}
