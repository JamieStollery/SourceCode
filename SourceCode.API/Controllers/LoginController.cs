using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SourceCode.API.Models;
using SourceCode.API.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SourceCode.API.Controllers
{
    [ApiController]
    [Authorize(policy: "User")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IJwtTokenBuilder _jwtTokenBuilder;
        private readonly UserContext _context;


        public LoginController(ILogger<LoginController> logger, IJwtTokenBuilder jwtTokenBuilder, UserContext context)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _jwtTokenBuilder = jwtTokenBuilder ?? throw new ArgumentNullException(nameof(jwtTokenBuilder));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Post(LoginRequest loginRequest)
        {
            _logger.LogInformation($"Login {loginRequest.EmailAddress}");

            var user = _context.Users.SingleOrDefault(user => user.EmailAddress == loginRequest.EmailAddress);

            if (user is null)
            {
                // Incorrect email
                return NotFound();
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(loginRequest.Password);
            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                // Incorrect password
                return NotFound();
            }


            var response = new
            {
                token = _jwtTokenBuilder.Build(user)
            };
            return Ok(response);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("signup")]
        public async Task<IActionResult> Post(SignUpRequest signUpRequest)
        {
            _logger.LogInformation($"Sign up {signUpRequest.EmailAddress}");

            if (_context.Users.Any(user => user.EmailAddress == signUpRequest.EmailAddress))
            {
                // Email taken
                return NotFound();
            }

            var user = new User
            {
                FirstName = signUpRequest.FirstName,
                EmailAddress = signUpRequest.EmailAddress,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(signUpRequest.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }
    }
}
