using HomeStock.Data;
using HomeStockAPI.Model.Internal;
using System.Data.Entity;

namespace HomeStockAPI.Data
{
    public class HomeStockContext : DbContext
    {
        public HomeStockContext() : base()
        {
            Database.SetInitializer(new HomeStockDBInit());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }

        public DbSet<mContainer> Containers { get; set; }
        public DbSet<mHome> Homes { get; set; }
        public DbSet<mOwner> Owners { get; set; }
        public DbSet<mStock> Stock { get; set; }
        public DbSet<mTag> Tags { get; set; }
    }
}