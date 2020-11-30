using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Nude_Solutions.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nude_Solutions.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MvcItemContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<MvcItemContext>>()))
            {
                // Look for any items
                if ( context.Item.Any() )
                {
                    return;   // DB has been seeded
                }

                context.Item.AddRange(
                    new Item
                    {
                        Name = "Damian Lillard",
                        Price = 28000000,
                        Category = "Portland Trailblazers",
                        Id = 0
                    },
                    new Item
                    {
                        Name = "Devin Booker",
                        Price = 27000000,
                        Category = "Phoenix Suns",
                        Id = 0
                    },
                    new Item
                    {
                        Name = "Rajon Rondo",
                        Price = 7500000,
                        Category = "Los Angeles Lakers",
                        Id = 0
                    },
                    new Item
                    {
                        Name = "LeBron James",
                        Price = 38000000,
                        Category = "Los Angeles Lakers",
                        Id = 0
                    },
                    new Item
                    {
                        Name = "CJ McCollum",
                        Price = 2500000,
                        Category = "Portland Trailblazers",
                        Id = 0
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
