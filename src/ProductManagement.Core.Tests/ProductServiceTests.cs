using System;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using ProductManagement.Core.Dto;
using ProductManagement.Core.services.implementations;
using ProductManagement.Core.services.interfaces;
using ProductManagement.Data.EF;
using ProductManagement.Data.EF.Models;
using ProductManagement.Data.EF.Models.Enums;

namespace ProductManagement.Core.Tests {
    public class ProductServiceTests {
        private readonly ProductManagementDbContext _dbContext;
        private readonly Guid product1Id = Guid.NewGuid ();
        private readonly Guid product2Id = Guid.NewGuid ();
        private readonly Guid nonExistingProductId = Guid.NewGuid ();
        private readonly IProductService _sut;
        private Product product1;
        private ProductDto productDto;

        public ProductServiceTests () {
            var options = new DbContextOptionsBuilder<ProductManagementDbContext> ()
                .UseInMemoryDatabase ("dataservice_db")
                .Options;
            _dbContext = new ProductManagementDbContext (options);
            _sut = new ProductService (_dbContext);

            product1 = new Product {
                id = product1Id,
                Name = "product1",
                Price = 10,
                Active = true,
                Type = ProductType.Electronics
            };

            productDto = new ProductDto {
                id = product2Id,
                Name = "product1",
                Price = 10,
                Active = true,
                Type = "Non existing product type"
            };

            _dbContext.Add (product1);
            _dbContext.SaveChanges ();
        }

        [Test]
        public async Task Get_product1 () {
            var product = await _sut.GetProduct (product1Id);

            product.Should ().BeEquivalentTo (product1);
        }

        [Test]
        public void Get_product_does_not_exist () {
            Func<Task> test = async () => {
                await _sut.GetProduct (nonExistingProductId);
            };

            test.Should ().Throw<ArgumentException> ();
        }

        [Test]
        public void Create_product_with_product_typenot_exist () {
            Func<Task> test = async () => {
                await _sut.CreateProduct (productDto);
            };

            test.Should ().Throw<ArgumentException> ();
        }

        [Test]
        public void Update_product_with_product_typenot_exist () {
            Func<Task> test = async () => {
                await _sut.UpdateProduct (productDto);
            };

            test.Should ().Throw<ArgumentException> ();
        }

        [Test]
        public void Delete_product_does_not_exist () {
            Func<Task> test = async () => {
                await _sut.DeleteProduct (nonExistingProductId);
            };

            test.Should ().Throw<ArgumentException> ();
        }
    }
}