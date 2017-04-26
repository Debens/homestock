using HomeStockLibrary.Configuration;
using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Controls.Resources.Core;
using HomeStockLibrary.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;

namespace HomeStockLibrary.Controls.Resources
{
    public class FileInclusion : WebControlBase
    {
        public string Source { get; set; }

        private string _filter;
        public string Filter
        {
            get
            {
                return _filter ?? "*";
            }
            set
            {
                _filter = value;
            }
        }

        public FileInclusionType type { get; set; }

        protected override void Render(HtmlTextWriter writer)
        {
            HomeStockContext context = new HomeStockContext();
            string appRelativePath = Source.StartsWith("~/") ? Source : "~/" + Source;
            string fullPath = context.MapPath(appRelativePath);

            List<string> files = new List<string>();
            if (Directory.Exists(fullPath))
                files = Directory.EnumerateFiles(fullPath, Filter, SearchOption.AllDirectories).ToList();
            else if (File.Exists(fullPath))
                files.Add(fullPath);

            if(files.Count < 1)
                throw new ArgumentException(string.Format("Cannot find any files under {0} using the filter '{1}'", fullPath, Filter));

            foreach(string file in files)
            {
                RenderInclusionTag(writer, getRelativePath(file, context.MapPath(Source)), type);
            }
        }

        private string getRelativePath(string filespec, string folder)
        {
            Uri pathUri = new Uri(filespec);
            // Folders must end in a slash
            if (!folder.EndsWith(Path.DirectorySeparatorChar.ToString()))
            {
                folder += Path.DirectorySeparatorChar;
            }
            Uri folderUri = new Uri(folder);
            return Uri.UnescapeDataString(folderUri.MakeRelativeUri(pathUri).ToString().Replace('/', Path.DirectorySeparatorChar));
        }

        private void RenderInclusionTag(HtmlTextWriter writer, string path, FileInclusionType type)
        {
            string tag = "";
            string versionSuffix = "?ver=" + HomeStock.GetConfig().Version;
            switch(type)
            {
                case FileInclusionType.Script: { tag = string.Format("<script type=\"text/javascript\" src=\"{0}{1}\"></script>", path, versionSuffix); } break;
                case FileInclusionType.Style: { tag = string.Format("<link rel=\"stylesheet\" type=\"text/css\" href=\"{0}{1}\">", path, versionSuffix); } break;
                default: { throw new ArgumentException(string.Format("Cannot render inclusion tage for type {0}", type)); }
            }
            writer.WriteLine(tag);
        }

        public override void ValidateProperties()
        {
            Validate(Source, "Source");
        }
    }
}
