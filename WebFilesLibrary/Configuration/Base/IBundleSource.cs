using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilesLibrary.Configuration.Base
{
    public interface IBundleSource
    {
        string Name { get; set; }

        string FolderSrc { get; set; }

        BundleType Type { get; set; }

        string Filter { get; set; }

        bool IncludeSubFolders { get; set; }
    }
}
