using GitRepo.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace GitRepo.Web.Controllers
{
    public class HomeController : Controller
    {
        IGitService _gitService;
        public HomeController(IGitService gitService)
        {
            _gitService = gitService;
        }
        public ActionResult Index()
        {
            if (Session["bookmarks"] != null)
                ViewBag.bookMarks = new JavaScriptSerializer().Serialize(((List<int>)Session["bookmarks"]));
            else
            {
                ViewBag.bookMarks = new JavaScriptSerializer().Serialize(new List<int>());
            }
            return View();
        }

        public JsonResult RemoveBookMarkByRepoId(int id)
        {
            var result = _gitService.SaveBookMarkByRepoId(id);
            return Json(result, JsonRequestBehavior.DenyGet);
        }

        public JsonResult GetBookMarks()
        {
            if (Session["bookmarks"] == null)
                return null;
            return Json((List<int>)Session["bookmarks"], JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult AddBookMarkByRepoId(int id)
        {
            if (Session["bookmarks"] == null)
            {
                var bookMarkList = new List<int>() { id };
                Session["bookmarks"] = bookMarkList;
                var result = true;
                return Json(result, JsonRequestBehavior.DenyGet);
            }
            else
            {
                if (((List<int>)Session["bookmarks"]).Exists(bookId => bookId == id))
                {
                    ((List<int>)Session["bookmarks"]).Remove(id);
                    return Json(false, JsonRequestBehavior.DenyGet);
                }
                else
                {
                    ((List<int>)Session["bookmarks"]).Add(id);
                    var result = true;
                    return Json(result, JsonRequestBehavior.DenyGet);

                };
            }


            // var result = _gitService.RemoveBookMarkByRepoId(id);
            // return Json(result, JsonRequestBehavior.DenyGet);
        }
    }
}