using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Util
{
    public static class HomeStockObjectAssistant
    {
        public static IEnumerable<PropertyInfo> GetPropertyInfoRecursively(Type type)
        {
            var properties = type.GetProperties();

            foreach (var property in properties)
            {
                var name = property.Name;
                var propertyType = GetGenericArguemnt(property.PropertyType);
                if (typeof(IList).IsAssignableFrom(propertyType))
                {
                    var genericType = propertyType.GetGenericArguments()[0];
                    yield return property;
                    foreach (var info in GetPropertyInfoRecursively(genericType))
                        yield return info;
                }
                else if (property.PropertyType.Module.ScopeName != "CommonLanguageRuntimeLibrary")
                {
                    foreach (var info in GetPropertyInfoRecursively(propertyType))
                        yield return info;
                }
                else
                {
                    yield return property;
                }
            }

            var interfaces = type.GetInterfaces();
            foreach (var subInterface in interfaces)
            {
                foreach (var info in GetPropertyInfoRecursively(subInterface))
                    yield return info;
            }
        }

        public static Type GetGenericArguemnt(Type type)
        {
            if (!type.IsGenericType)
                return type;
            if (type.GetGenericTypeDefinition() != typeof(List<>))
                throw new Exception("Only List<T> are allowed");
            return type.GetGenericArguments()[0];
        }
    }
}
