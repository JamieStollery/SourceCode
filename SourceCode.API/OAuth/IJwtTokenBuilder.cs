using SourceCode.API.Models;

namespace SourceCode.API.OAuth
{
    public interface IJwtTokenBuilder
    {
        string Build(User user);
    }
}