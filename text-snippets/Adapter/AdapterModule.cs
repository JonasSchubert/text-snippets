using Autofac;
using guepardoapps.text_snippets.Adapter.I18nService;

namespace guepardoapps.text_snippets.Adapter
{
    public class AdapterModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<I18nServiceAdapter>().AsImplementedInterfaces();
        }
    }
}
