namespace SourceCode.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string EmailAddress { get; set; }
        public string PasswordHash { get; set; }
    }
}
