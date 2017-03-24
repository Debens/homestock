using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HomeStock.Data
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
    }
}