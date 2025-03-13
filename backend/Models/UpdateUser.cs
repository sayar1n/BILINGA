namespace backend.Models
{
    public class UpdateUser
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required int Score { get; set; }
    }
}    
