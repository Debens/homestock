using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WebFilesLibrary.Configuration.Base;

namespace WebFilesLibrary.FileManagement
{
    public static class Bundler
    {
        public static void Bundle(string folderSrc, string folderDst, string name, BundleType type, string filter = "*")
        {
            if (!Directory.Exists(folderSrc))
                throw new ArgumentException(string.Format("Cannot bundle files in Directory '{0}' as it does not exist", folderSrc));

            IEnumerable<string> files = Directory.EnumerateFiles(folderSrc, filter, SearchOption.AllDirectories).OrderBy(f => f);

            StringBuilder bundledFile = new StringBuilder();
            foreach(string file in files)
            {
                bundledFile.AppendLine(File.ReadAllText(file));
            }
            
            string targetFile = folderDst + name + (type == BundleType.Script ? ".js" : ".css"); //TODO: Get file extension from enum attribute
            string dir = Path.GetDirectoryName(targetFile);
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);
            if (File.Exists(targetFile))
                File.Delete(targetFile);

            using (StreamWriter sw = File.AppendText(targetFile))
            {
                sw.Write(bundledFile.ToString());
            }
        }
    }
}
