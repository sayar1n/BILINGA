namespace backend.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public string Level { get; set; } // Уровень языка
    }
}