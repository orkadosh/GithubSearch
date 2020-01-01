using System.Web;
using System.Web.Optimization;

namespace GitRepo.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;
            BundleTable.Bundles.UseCdn = true;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            // Add the angular lib to the bundle. 
            var angularCdnPath = "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.8/angular.min.js";
            bundles.Add(new ScriptBundle("~/bundles/Angular", angularCdnPath));


            var uiBoostrap = "https://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.3.0.min.js";
            bundles.Add(new ScriptBundle("~/bundles/uiBoostrap", uiBoostrap));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
