using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Core.Dto;
using ProductManagement.Core.services.interfaces;
using ProductManagement.Data.EF;
using ProductManagement.Data.EF.Models;
using ProductManagement.Data.EF.Models.Enums;
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
        private readonly IMapper _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<ProductProfile>()));

        public ProductService(ProductManagementDbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateProduct(ProductDto productDto)
        {
            try
            {
                var product = _mapper.Map<Product>(productDto);
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return product;
            }
            catch (AutoMapperMappingException)
            {
                throw new ArgumentException($"Product type {productDto.Type} does not exist");
            }
        }

        public async Task<string> DeleteProduct(Guid id)
        {
            var product = await _context.Products.Where(product => product.id == id).FirstOrDefaultAsync();
            if (product == null)
            {
                throw new ArgumentException($"Product {id} does not exist");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return $"{product.Name} has been deleted";
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProduct(Guid id)
        {
            var product = await _context.Products.Where(product => product.id == id).FirstOrDefaultAsync();
            if (product == null)
            {
                throw new ArgumentException($"Product {id} does not exist");
            }

            return product;
        }

        public async Task<Product> UpdateProduct(ProductDto productDto)
        {
            var product = await GetProduct(productDto.id);
            ProductType productType;

            if (!Enum.TryParse(productDto.Type, out productType))
            {
                throw new ArgumentException($"Product type {productDto.Type} does not exist");
            }

            product.Type = productType;
            product.Name = productDto.Name;
            product.Price = productDto.Price;
            product.Active = productDto.Active;

            _context.Update(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
