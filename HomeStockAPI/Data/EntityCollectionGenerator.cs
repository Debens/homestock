using HomeStockAPI.Model.Internal.Base;

namespace HomeStock.Data
{
    public class EntityCollectionGenerator<T> where T : mEntity
    {
        //private static Random Rand = new Random();

        //private static List<T> Generate(HomeStockContext context, int minCount, int maxCount, List<string> entityNames, Func<string, DateTime, T> EntityGenerator)
        //{
        //    List<T> Entities = new List<T>();
        //    List<string> UsedNames = new List<string>();

        //    for (int i = 0; i < Rand.Next(minCount, maxCount + 1); i++)
        //    {
        //        string choosenName = "";
        //        do
        //        {
        //            choosenName = entityNames[Rand.Next(entityNames.Count)];
        //        } while (UsedNames.Contains(choosenName));
        //        UsedNames.Add(choosenName);
        //        T Entity = EntityGenerator(choosenName, DateTime.UtcNow);
        //        Entities.Add(Entity);
        //    }
        //    return Entities;
        //}
    }
}