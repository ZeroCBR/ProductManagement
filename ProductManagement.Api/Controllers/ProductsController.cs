﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductManagement.Core.Dto;
using ProductManagement.Core.services.interfaces;

namespace product_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<ProductProfile>()));

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _productService.GetAllProducts();
            var productDtos = products.Select(product=> _mapper.Map<ProductDto>(product));
            return Ok(productDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await _productService.GetProduct(id);
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var message = await _productService.DeleteProduct(id);

            return Ok(message);
        }
    }
}
