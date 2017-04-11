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
        private static SmartCache<string, string> cache = new SmartCache<string, string>(ReadAssemblyResource);
        private static SmartCache<string, string> tempaltes = new SmartCache<string, string>(ReadTemplate);

        public static string LoadAssemblyResource(string resource) { return cache[resource]; }
        public static string LoadTempalte(string template) { return tempaltes[template]; }

        private static string ReadAssemblyResource(string resource)
        {
            var assembly = Assembly.GetAssembly(typeof(ResourceLoader));
            var fullPath = assembly.GetName().Name + "." + resource;

            string resourceContent = null;
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

        private static string ReadTemplate(string resource)
        {
            var assembly = Assembly.GetAssembly(typeof(ResourceLoader));
            var fullPath = assembly.GetName().Name + ".Controls.Templates." + resource;

            string resourceContent = null;
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
