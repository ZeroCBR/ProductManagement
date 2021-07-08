using Microsoft.EntityFrameworkCore;
using ProductManagement.Data.EF.Models;

namespace ProductManagement.Data.EF
{
    public class ProductManagementDbContext : DbContext
    {
        public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}