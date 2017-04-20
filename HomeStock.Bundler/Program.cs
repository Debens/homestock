using System;
using System.Web;
using WebFilesLibrary.Configuration;
using WebFilesLibrary.FileManagement;

namespace ConsoleApplication1
{
    public class Program
    {
        static void Main(string[] args)
        {
            string baseDirectory = null;
            if (args.Length > 0)
                baseDirectory = args[0];

#if DEBUG
            if (string.IsNullOrEmpty(baseDirectory))
                baseDirectory = "C:\\Users\\Sven\\Documents\\GitHub\\HomeStock\\";
#endif

            if (string.IsNullOrEmpty(baseDirectory))
                throw new ArgumentNullException("Bundler requires a base direction to search for folder sources");

            foreach(Bundle bundle in BundleConfig.GetConfig().BundleCollections)
            {
                foreach(BundleSource bundleSource in bundle.Bundles)
                {
                    var targetDir = FormatPath(bundle.OutputFolder, baseDirectory);
                    Bundler.Bundle(FormatPath(bundleSource.FolderSrc, baseDirectory), targetDir, bundleSource.Name, bundle.Type, bundle.Filter);
                    Console.WriteLine(string.Format("Bundle '{0}' built at {1}", bundleSource.Name, targetDir));
                }
            }
        }

        private static string FormatPath(string path, string solutionPath)
        {
            path = path.Replace("~/", solutionPath);
            path = path.Replace("/", "\\");
            return path;
        }
    }
}
