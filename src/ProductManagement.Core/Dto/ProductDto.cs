using AutoMapper;
using ProductManagement.Data.EF.Models;
using ProductManagement.Data.EF.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ProductManagement.Core.Dto
{
    public class ProductDto
    {
        [Required]
        public Guid id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public bool Active { get; set; }
    }


    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductDto, Product>()
                .ForMember(product=>product.Type,
                opt=>opt.MapFrom(productDto=>Enum.Parse(typeof(ProductType),productDto.Type)));
            CreateMap<Product, ProductDto>()
                .ForMember(productDto => productDto.Type,
                opt => opt.MapFrom(product => Enum.GetName(typeof(ProductType), product.Type))); ;
        }
    }
}
