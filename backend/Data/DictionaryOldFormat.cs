using System.Text.Json.Serialization;

namespace backend.Models
{
    public class DictionaryOldFormat
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("en")]
        public string En { get; set; }

        [JsonPropertyName("ru")]
        public string Ru { get; set; }

        [JsonPropertyName("tr")]
        public string Tr { get; set; }
    }
}