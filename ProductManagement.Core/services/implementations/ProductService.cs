using Microsoft.EntityFrameworkCore;
using ProductManagement.Core.services.interfaces;
using ProductManagement.Data.EF;
using ProductManagement.Data.EF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductManagement.Core.services.implementations
{
    public class ProductService : IProductService
    {
        private readonly ProductManagementDbContext _context;

        public ProductService(ProductManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
