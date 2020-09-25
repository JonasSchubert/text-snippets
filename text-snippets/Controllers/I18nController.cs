using System.Collections.Generic;
using System.Threading.Tasks;
using guepardoapps.text_snippets.Adapter.I18nService;
using Microsoft.AspNetCore.Mvc;

namespace guepardoapps.text_snippets.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("text-snippets/api/v1/[controller]")]
    public class I18nController : ControllerBase
    {
        private readonly II18nServiceAdapter _i18nServiceAdapter;

        public I18nController(II18nServiceAdapter i18nServiceAdapter)
        {
            _i18nServiceAdapter = i18nServiceAdapter;
        }

        [HttpGet]
        [Route("GetAvailableIetf")]
        public async Task<ActionResult<List<string>>> GetAvailableIetf() => await _i18nServiceAdapter.GetAvailableIetf();

        [HttpGet]
        [Route("GetIetfTranslations/{ietfTag}")]
        public async Task<ActionResult<Dictionary<string, Dictionary<string, string>>>> GetIetfTranslations(string ietfTag) => await _i18nServiceAdapter.GetIetfTranslations(ietfTag);

        [HttpGet]
        [Route("GetAllIetfTranslations")]
        public async Task<ActionResult<Dictionary<string, Dictionary<string, Dictionary<string, string>>>>> GetAllIetfTranslations() => await _i18nServiceAdapter.GetAllIetfTranslations();
    }
}
