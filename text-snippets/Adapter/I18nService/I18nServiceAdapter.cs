using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace guepardoapps.text_snippets.Adapter.I18nService
{
    public class I18nServiceAdapter : II18nServiceAdapter
    {
        private readonly string _endpoint;

        private readonly string _token;

        public I18nServiceAdapter(IConfiguration configuration)
        {
            var i18nServiceSettingsConfig = configuration.GetSection("I18nServiceSettings");
            _endpoint = i18nServiceSettingsConfig["Endpoint"];
            _token = i18nServiceSettingsConfig["Token"];
        }

        public async Task<Dictionary<string, Dictionary<string, Dictionary<string, string>>>> GetAllIetfTranslations()
        {
            var ietfTranslations = new Dictionary<string, Dictionary<string, Dictionary<string, string>>>();

            var client = new HttpClient();
            var response = await client.GetAsync($"{_endpoint}GetAllIetfTranslations/{_token}");
            if (response.IsSuccessStatusCode)
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                ietfTranslations = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, Dictionary<string, string>>>>(apiResponse);
            }

            return ietfTranslations;
        }

        public async Task<List<string>> GetAvailableIetf()
        {
            var availableIetf = new List<string>();

            var client = new HttpClient();
            var response = await client.GetAsync($"{_endpoint}GetAvailableIetf/{_token}");
            if (response.IsSuccessStatusCode)
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                availableIetf = JsonConvert.DeserializeObject<List<string>>(apiResponse);
            }

            return availableIetf;
        }

        public async Task<Dictionary<string, Dictionary<string, string>>> GetIetfTranslations(string ietfTag)
        {
            var ietfTranslations = new Dictionary<string, Dictionary<string, string>>();

            var client = new HttpClient();
            var response = await client.GetAsync($"{_endpoint}GetIetfTranslations/{_token}/{ietfTag}");
            if (response.IsSuccessStatusCode)
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                ietfTranslations = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, string>>>(apiResponse);
            }

            return ietfTranslations;
        }
    }
}
