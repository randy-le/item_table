using Microsoft.AspNetCore.Mvc;
using Nude_Solutions.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Nude_Solutions.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly MvcItemContext _context;

        public ItemsController( MvcItemContext context )
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Item>> Get()
        {
            List<Item> items = await _context.Item.ToListAsync();
            return items;
        }

        /**
         * TODO: figure out why this works on PostMan and not the frontend (415)
         * - probably something to do with headers of request?
         */
        [HttpPost]
        public async Task<List<Item>> Add( Item item )
        {
            Item tempItem = new Item();
            tempItem.Category = "Los Angeles Lakers";
            tempItem.Name = "Kobe Bryant";
            tempItem.Price = 81;
            tempItem.Id = 0;

            _context.Item.Add( tempItem );
            await _context.SaveChangesAsync();

            return await _context.Item.ToListAsync();
        }

        [HttpPost("{id}")]
        public async Task<List<Item>> Delete( int id )
        {
            var item = await _context.Item.FindAsync( id );
            _context.Item.Remove( item );
            await _context.SaveChangesAsync();

            return await _context.Item.ToListAsync();
        }
    }
}
