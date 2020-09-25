using System.Collections.Generic;
using System.Threading.Tasks;

namespace guepardoapps.text_snippets.Adapter.I18nService
{
    public interface II18nServiceAdapter
    {
        Task<List<string>> GetAvailableIetf();

        Task<Dictionary<string, Dictionary<string, string>>> GetIetfTranslations(string ietfTag);

        Task<Dictionary<string, Dictionary<string, Dictionary<string, string>>>> GetAllIetfTranslations();
    }
}
