using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DictionaryController : ControllerBase
    {
        private readonly string _jsonFilePath = "Data/dictionary.json";
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions 
        { 
            WriteIndented = true,
            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };

        private List<Dictionary> LoadDictionary()
        {
            if (!System.IO.File.Exists(_jsonFilePath))
                return new List<Dictionary>();

            try
            {
                var jsonData = System.IO.File.ReadAllText(_jsonFilePath, Encoding.UTF8);
                var originalList = JsonSerializer.Deserialize<List<DictionaryOldFormat>>(jsonData, _jsonOptions) ?? new List<DictionaryOldFormat>();

                return originalList.Select(d => new Dictionary
                {
                    Term = d.En,
                    Translate = d.Ru,
                    Transcription = d.Tr,
                    Synonyms = new List<string>()
                }).ToList();
            }
            catch (JsonException)
            {
                return new List<Dictionary>();
            }
        }

        private void SaveDictionary(List<Dictionary> dictionary)
        {
            var jsonData = JsonSerializer.Serialize(dictionary, _jsonOptions);
            System.IO.File.WriteAllText(_jsonFilePath, jsonData, Encoding.UTF8);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var dictionary = LoadDictionary();
            return Ok(dictionary);
        }

        [HttpGet("search/{word}")]
        public IActionResult Search(string word)
        {
            var dictionary = LoadDictionary();

            var entry = dictionary.FirstOrDefault(d =>
                string.Equals(d.Term, word, System.StringComparison.OrdinalIgnoreCase) ||
                string.Equals(d.Translate, word, System.StringComparison.OrdinalIgnoreCase));

            if (entry == null)
            {
                return NotFound(new { message = "Слово не найдено" });
            }
            return Ok(entry);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Dictionary newEntry)
        {
           
            var dictionary = LoadDictionary();
            dictionary.Add(newEntry);
            SaveDictionary(dictionary);

            return CreatedAtAction(nameof(Search), new { word = newEntry.Term }, newEntry);
        }

        [HttpPatch]
        public IActionResult Update(string term, [FromBody] Dictionary updatedEntry)
        {
            var dictionary = LoadDictionary();
            var index = dictionary.FindIndex(d => d.Term == term || d.Translate == term);

            if (index == -1)
            {
                return NotFound();
            }

            dictionary[index] = new Dictionary
            {
                Term = dictionary[index].Term,
                Translate = updatedEntry.Translate,
                Transcription = updatedEntry.Transcription,
                Synonyms = updatedEntry.Synonyms
            };

            SaveDictionary(dictionary);

            return Ok(dictionary[index]);
        }


        [HttpDelete("{term}")]
        public IActionResult Delete(string term)
        {
            var dictionary = LoadDictionary();
            var entry = dictionary.FirstOrDefault(d => d.Term == term || d.Translate == term);

            if (entry == null)
            {
                return NotFound();
            }

            dictionary.Remove(entry);
            SaveDictionary(dictionary);

            return Ok(new { message = "Запись удалена" });
        }
    }
}
