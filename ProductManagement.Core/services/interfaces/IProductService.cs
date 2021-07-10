using ProductManagement.Data.EF.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProductManagement.Core.services.interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product> GetProduct(Guid id);
        Task<string> DeleteProduct(Guid id);
    }
}
