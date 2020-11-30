using Microsoft.EntityFrameworkCore;
using Nude_Solutions;

namespace Nude_Solutions.Data
{
    public class MvcItemContext : DbContext
    {
        public MvcItemContext ( DbContextOptions<MvcItemContext> options )
        : base( options )
        {
        }

        public DbSet<Item> Item { get; set; }
    }
}
