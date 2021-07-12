using Microsoft.EntityFrameworkCore;
using ProductManagement.Data.EF.Models;
using ProductManagement.Data.EF.Models.Enums;
using System;

namespace ProductManagement.Data.EF
{
    public class ProductManagementDbContext : DbContext
    {
        public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Product>()
                .Property(e => e.Type)
                .HasConversion(
                    v => v.ToString(),
                    v => (ProductType)Enum.Parse(typeof(ProductType), v));
        }
    }
}