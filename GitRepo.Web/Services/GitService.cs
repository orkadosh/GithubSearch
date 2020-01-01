using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace GitRepo.Web.Services
{
    public class GitService : Controller, IGitService
    {
        public List<GitRepoisoty> GetRepositoriesByName(string name)
        {
            return new List<GitRepoisoty>() { };
        }

        public bool SaveBookMarkByRepoId(int id)
        {
            if (Session["bookmarks"] == null)
            {
                var bookMarkList = new List<int>() { id };
                Session["bookmarks"] = bookMarkList;
                return true;
            }
            else
            {
                if (((List<int>)Session["bookmarks"]).Exists(bookId => bookId == id)) return true;
                else
                {
                    ((List<int>)Session["bookmarks"]).Add(id);
                    return true;
                };
            }
        }

        public bool RemoveBookMarkByRepoId(int id)
        {
            if (Session["bookmarks"] == null || ((List<int>)Session["bookmarks"]).Count==0)
                return false;
            else
            {
                if (((List<int>)Session["bookmarks"]).Exists(bookId => bookId == id)) {
                    ((List<int>)Session["bookmarks"]).Remove(id);
                    return true;
                }
                else
                {
                    return false;
                };
            }
        }
    }
}