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

            BundleSourceCollection bundles = getBundleDefinitions();
            foreach(BundleSource bundle in bundles)
            {
                var targetDir = formatPath(BundleConfig.GetConfig().OutputFolder, baseDirectory);
                Bundler.Bundle(formatPath(bundle.FolderSrc, baseDirectory), targetDir, bundle.Name, bundle.Type, bundle.Filter);
                Console.WriteLine(string.Format("Bundle '{0}' built at {1}", bundle.Name, targetDir));
            }
        }

        private static BundleSourceCollection getBundleDefinitions()
        {
            BundleSourceCollection bundles = BundleConfig.GetConfig().BundleSources;
            if (bundles == null)
                throw new ApplicationException("Cannot find bundle configuration for bundle sources");
            return bundles;
        }

        private static string formatPath(string path, string solutionPath)
        {
            path = path.Replace("~/", solutionPath);
            path = path.Replace("/", "\\");
            return path;
        }
    }
}
