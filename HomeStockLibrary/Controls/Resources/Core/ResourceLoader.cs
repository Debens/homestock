using HomeStockLibrary.Cache;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Resources.Core
{
    public static class ResourceLoader
    {
        private static SmartCache<string, string> cache = new SmartCache<string, string>(ReadResource);
        private static SmartCache<string, string> tempaltes = new SmartCache<string, string>(ReadTemplate);

        public static string LoadResource(string resource) { return cache[resource]; }
        public static string LoadTempalte(string template) { return tempaltes[template]; }

        private static string ReadResource(string resource)
        {
            return ReadAssemblyResource(resource);
        }

        private static string ReadTemplate(string resource)
        {
            return ReadAssemblyResource(resource, "Controls.Templates");
        }

        private static string ReadAssemblyResource(string resource, string pathExtention = null)
        {
            if (!string.IsNullOrEmpty(pathExtention))
                pathExtention = pathExtention + ".";    
            var assembly = Assembly.GetAssembly(typeof(ResourceLoader));
            var fullPath = assembly.GetName().Name + "." + pathExtention.ToString() + resource;

            string resourceContent = null;
            string[] names = assembly.GetManifestResourceNames();
            using (var stream = assembly.GetManifestResourceStream(fullPath))
            {
                if (stream != null)
                {
                    using (var reader = new StreamReader(stream))
                    {
                        resourceContent = reader.ReadToEnd();
                    }
                }
            }

            return resourceContent;
        }
    }
}
