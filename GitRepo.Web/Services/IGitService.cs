using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GitRepo.Web.Services
{
    public interface IGitService
    {
        List<GitRepoisoty> GetRepositoriesByName(string name);
        bool SaveBookMarkByRepoId(int id);
        bool RemoveBookMarkByRepoId(int id);

    }
}