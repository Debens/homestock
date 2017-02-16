using HomeStock.Model.External;
using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace OwnerStock.Model.MappingExtensions
{
    public static class OwnerMappingExtentions
    {
        public static Owner Map(this mOwner owner)
        {
            var newOwner = new Owner()
            {
                Id = owner.Id,
                Name = owner.Name,
                Created = owner.Created
            };
            return newOwner;
        }

        public static IEnumerable<Owner> Map(this IEnumerable<mOwner> owner)
        {
            return owner.Select(s => s.Map());
        }

        public static mOwner Map(this Owner owner)
        {
            var newOwner = new mOwner()
            {
                Id = owner.Id,
                Name = owner.Name,
                Created = owner.Created,
                Homes = new Collection<mHome>()
            };
            return newOwner;
        }

        public static IEnumerable<mOwner> Map(this IEnumerable<Owner> owner)
        {
            return owner.Select(s => s.Map());
        }
    }
}