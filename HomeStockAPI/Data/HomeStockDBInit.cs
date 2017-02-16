using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HomeStock.Data
{
    public class HomeStockDBInit : DropCreateDatabaseIfModelChanges<HomeStockContext>
    {

        private static readonly Random Rand = new Random();

        private static List<string> OwnerNames = new List<string>(new string[] { "Debens'", "Towns'", "Houstons'" });
        private static List<string> HomeNames = new List<string>(new string[] { "Home", "Holiday Home - Iceland", "22 Lammas Road", "Work", "Temp" });
        private static List<string> ContainerNames = new List<string>(new string[] { "The Fridge", "The Freezer", "The Utility Freezer", "The Utility Fridge", "General" });
        private static List<string> ItemNames = new List<string>(new string[] { "Milk", "Bread", "Juice" });
        private static List<string> ItemTags = new List<string>(new string[] { "Meat", "Dairy", "Alcohol", "Pasta", "Froozen", "Liquid", "Vegetable", "Valuable", "Curry", "Italian", "Seafood" });

        private static readonly int MinHomeCount = 1;
        private static readonly int MaxHomeCount = HomeNames.Count;
        private static readonly int MinContainerCount = 1;
        private static readonly int MaxContainerCount = ContainerNames.Count;
        private static readonly int MinItemCount = 5;
        private static readonly int MaxItemCount = 20;
        private static readonly int MinTagCount = 0;
        private static readonly int MaxTagCount = 5;

        protected override void Seed(HomeStockContext context)
        {
            List<mOwner> Owners = SeedOwners(context);
            List<mHome> Homes = SeedHomes(context, Owners);
            List<mContainer> Containers = SeedContainers(context, Homes);
            List<mStock> Stock = SeedStock(context, Containers);

            context.SaveChanges();

            base.Seed(context);
        }

        private List<mOwner> SeedOwners(HomeStockContext context)
        {
            List<mOwner> Owners = new List<mOwner>();
            List<string> UsedNames = new List<string>();
            for (int i = 0; i < OwnerNames.Count; i++)
            {
                string choosenName = "";
                do
                {
                    choosenName = OwnerNames[Rand.Next(OwnerNames.Count)];
                } while (UsedNames.Contains(choosenName));
                UsedNames.Add(choosenName);
                mOwner newOwner = new mOwner { Name = choosenName, Created = DateTime.UtcNow };
                Owners.Add(newOwner);
                context.Owners.Add(newOwner);
            }
            return Owners;
        }

        private List<mHome> SeedHomes(HomeStockContext context, List<mOwner> Owners)
        {
            List<mHome> Homes = new List<mHome>();
            foreach (mOwner owner in Owners)
            {
                List<string> UsedNames = new List<string>();
                for (int i = 0; i < Rand.Next(MinHomeCount, MaxHomeCount + 1); i++)
                {
                    string choosenName = "";
                    do
                    {
                        choosenName = HomeNames[Rand.Next(HomeNames.Count)];
                    } while (UsedNames.Contains(choosenName));
                    UsedNames.Add(choosenName);
                    mHome newHome = new mHome { Name = choosenName, Created = DateTime.UtcNow, Owner = owner };
                    Homes.Add(newHome);
                    context.Homes.Add(newHome);
                }
            }
            return Homes;
        }

        private List<mContainer> SeedContainers(HomeStockContext context, List<mHome> Homes)
        {
            List<mContainer> Containers = new List<mContainer>();
            foreach (mHome home in Homes)
            {
                List<string> UsedNames = new List<string>();
                for (int i = 0; i < Rand.Next(MinContainerCount, MaxContainerCount + 1); i++)
                {
                    string choosenName = "";
                    do
                    {
                        choosenName = ContainerNames[Rand.Next(ContainerNames.Count)];
                    } while (UsedNames.Contains(choosenName));
                    UsedNames.Add(choosenName);
                    mContainer newContainer = new mContainer { Name = choosenName, Created = DateTime.UtcNow, Home = home };
                    Containers.Add(newContainer);
                    context.Containers.Add(newContainer);
                }
            }
            return Containers;
        }

        private List<mStock> SeedStock(HomeStockContext context, List<mContainer> Containers)
        {
            List<mStock> Stock = new List<mStock>();
            foreach (mContainer container in Containers)
            {
                List<string> UsedNames = new List<string>();
                for (int i = 0; i < Rand.Next(MinItemCount, MaxItemCount + 1); i++)
                {
                    mStock newStock = new mStock
                    {
                        Name = ItemNames[Rand.Next(ItemNames.Count)],
                        Created = DateTime.UtcNow,
                        Container = container,
                        Expiry = DateTime.Now.AddDays(Rand.Next(10)),
                        Tags = BuildRandomTags(MinTagCount, MaxTagCount)
                    };
                    Stock.Add(newStock);
                    context.Stock.Add(newStock);
                }
            }
            return Stock;
        }

        private List<string> BuildRandomTags(int minCount, int maxCount)
        {
            List<string> tags = new List<string>();
            for (int i = 0; i < Rand.Next(minCount, maxCount + 1); i++)
            {
                tags.Add(ItemTags[Rand.Next(ItemTags.Count)]);
            }
            return tags;
        }
    }
}