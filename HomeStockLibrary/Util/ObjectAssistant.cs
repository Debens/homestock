using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Util
{
    public static class ObjectAssistant
    {
        public static IEnumerable<PropertyInfo> GetPropertyInfoRecursively(Type type)
        {
            var properties = type.GetProperties(BindingFlags.FlattenHierarchy | BindingFlags.Public | BindingFlags.Instance);
            foreach (var propertyInfo in properties)
            {
                if (typeof(IList).IsAssignableFrom(propertyInfo.PropertyType))
                {
                    var genericType = propertyInfo.PropertyType.GetGenericArguments()[0];
                    yield return propertyInfo;
                    foreach (var info in GetPropertyInfoRecursively(genericType))
                        yield return info;
                }
                else if (propertyInfo.PropertyType.Module.ScopeName != "CommonLanguageRuntimeLibrary")
                {
                    yield return propertyInfo;
                    foreach (var info in GetPropertyInfoRecursively(propertyInfo.PropertyType))
                        yield return info;
                }
                else
                {
                    yield return propertyInfo;
                }
            }

            var interfaces = type.GetInterfaces();
            foreach (var subInterface in interfaces)
            {
                foreach (var info in GetPropertyInfoRecursively(subInterface))
                    yield return info;
            }
        }
    }
}
