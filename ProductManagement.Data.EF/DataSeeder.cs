using ProductManagement.Data.EF.Models;
using ProductManagement.Data.EF.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProductManagement.Data.EF
{
    public class DataSeeder
    {
        private readonly ProductManagementDbContext _context;

        public DataSeeder(ProductManagementDbContext context)
        {
            _context = context;
        }

        public void seed(int num)
        {
            _context.Database.EnsureCreated();

            if (!_context.Products.Any())
            {
                var products = new List<Product>();

                for (int i = 0; i < num; i++)
                {
                    var numOfProductType = Enum.GetNames(typeof(ProductType)).Length;

                    var product = new Product
                    {
                        id = new Guid(),
                        Name = $"product {i}",
                        Price = generateFloat(),
                        Type = (ProductType)generateInt(numOfProductType),
                        Active = Convert.ToBoolean(generateInt(2))
                    };

                    products.Add(product);
                }

                _context.Products.AddRange(products);
                _context.SaveChanges();
            }
        }

        private float generateFloat()
        {
            var rnd = new Random();
            return (float)Math.Round(rnd.NextDouble() * 100, 2);
        }

        private int generateInt(int count)
        {
            var rnd = new Random();
            return rnd.Next(0, count);
        }
    }
}