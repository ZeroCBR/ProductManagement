﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Core.Dto;
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
        private readonly IMapper _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<ProductProfile>()));

        public ProductService(ProductManagementDbContext context)
        {
            _context = context;
        }

        public async Task<ProductDto> CreateProduct(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return productDto;
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
    }
}
