using Autofac;
using guepardoapps.text_snippets.Database.Factories;
using guepardoapps.text_snippets.Database.Repositories;

namespace guepardoapps.text_snippets.Database
{
    public class DatabaseModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<MainDbContext>().AsImplementedInterfaces().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(GetType().Assembly).AsClosedTypesOf(typeof(BaseRepository<>)).AsImplementedInterfaces();
            builder.RegisterAssemblyTypes(GetType().Assembly).AsClosedTypesOf(typeof(IBaseFactory<>)).AsImplementedInterfaces();
        }
    }
}
