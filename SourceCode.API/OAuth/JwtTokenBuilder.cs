using Microsoft.IdentityModel.Tokens;
using SourceCode.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SourceCode.API.OAuth
{
    public class JwtTokenBuilder : IJwtTokenBuilder
    {
        private readonly string _secret;

        public JwtTokenBuilder(string secret)
        {
            _secret = secret;
        }

        public SymmetricSecurityKey JwtSecurityKey => new(Encoding.ASCII.GetBytes(_secret));

        private SigningCredentials JwtSigningCredentials => new(JwtSecurityKey, SecurityAlgorithms.HmacSha256);

        public string Build(User user)
        {
            var token = new JwtSecurityToken(claims: CreateClaims(user), signingCredentials: JwtSigningCredentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static IEnumerable<Claim> CreateClaims(User user) => new List<Claim>() { new Claim("user", user.Id.ToString()) };
    }
}
