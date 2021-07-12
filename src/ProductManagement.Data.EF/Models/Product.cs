using ProductManagement.Data.EF.Models.Enums;
using System;

namespace ProductManagement.Data.EF.Models
{
    public class Product
    {
        public Guid id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public ProductType Type { get; set; }
        public bool Active { get; set; }
    }
}