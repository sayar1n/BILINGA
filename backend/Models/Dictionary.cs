using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Dictionary
    {
        [JsonPropertyName("term")]
        public string Term { get; set; }

        [JsonPropertyName("translate")]
        public string Translate { get; set; }

        [JsonPropertyName("transcription")]
        public string Transcription { get; set; }

        [JsonPropertyName("synonyms")]
        public List<string> Synonyms { get; set; } = new List<string>();
    }
}