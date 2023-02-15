using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SourceCode.API.Models;

namespace SourceCode.API.Controllers
{
    [ApiController]
    [Authorize(policy: "User")]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> _logger;
        private readonly ClientContext _context;

        public ClientController(ILogger<ClientController> logger, ClientContext clientContext)
        {
            _logger = logger;
            _context = clientContext;
        }

        // Create
        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient(Client client)
        {
            _logger.LogInformation("Inserting new client");

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }

        // Read
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            _logger.LogInformation("Querying all clients");

            var clients = await _context.Clients.ToListAsync();

            return Ok(clients.OrderBy(c => c.Name));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            _logger.LogInformation($"Querying client {id}");

            var client = await _context.Clients.FindAsync(id);

            if (client is null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        // Update
        [HttpPut]
        public async Task<IActionResult> UpdateClient(Client client)
        {
            _logger.LogInformation($"Updating client {client.Id}");

            if (!_context.Clients.Any(c => c.Id == client.Id))
            {
                return NotFound();
            }

            _context.Entry(client).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<Client>> DeleteClient(int id)
        {
            _logger.LogInformation($"Deleting client {id}");

            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }
    }
}