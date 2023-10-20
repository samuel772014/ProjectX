﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MVC_Project.Models;
using Org.BouncyCastle.Tls;
using SmartBreadcrumbs.Attributes;

namespace MVC_Project.Controllers
{
    public class GroupsController : Controller
    {
        private readonly ProjectXContext _context;

        public GroupsController(ProjectXContext context)
        {
            _context = context;
        }

        // GET: Groups
        public async Task<IActionResult> Index()
        {
            return _context.Group != null ?
                          View(await _context.Group.ToListAsync()) :
                          Problem("Entity set 'ProjectXContext.Group'  is null.");
        }

        // GET: Groups/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Group == null)
            {
                return NotFound();
            }

            var @group = await _context.Group
                .FirstOrDefaultAsync(m => m.GroupID == id);
            if (@group == null)
            {
                return NotFound();
            }

            return View(@group);
        }

        // GET: Groups/Create
        [Breadcrumb("個人揪團", FromAction = nameof(MyActivityController.HomePage), FromController = typeof(MyActivityController))]
        public async Task<IActionResult> Create(int? id)
        {
            ViewData["Organizer"] = new SelectList(_context.Member, "UserID", "UserID");
            ViewData["OriginalActivityID"] = new SelectList(_context.MyActivity, "ActivityID", "ActivityID");

            if (id.HasValue)
            {
                var existingGroup = await _context.Group.FindAsync(id.Value);
                if (existingGroup != null)
                {
                    return View(existingGroup);
                }
            }

            return View(new Group());
        }

        // POST: Groups/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("GroupID,GroupName,GroupCategory,GroupContent,MinAttendee,MaxAttendee,StartDate,EndDate,Organizer")] Group @group, List<IFormFile> imageDataFiles)
        {

            if (group.MaxAttendee <= group.MinAttendee)
            {
                ModelState.AddModelError(nameof(group.MaxAttendee),
                                         "人數上限不可小於人數下限");
            }

            if (ModelState.IsValid)
            {
                _context.Add(@group);
                await _context.SaveChangesAsync();

                // 上傳多張照片
                if (imageDataFiles != null && imageDataFiles.Count > 0)
                {
                    foreach (var imageDataFile in imageDataFiles)
                    {
                        if (imageDataFile != null && imageDataFile.Length > 0)
                        {
                            using (var stream = new MemoryStream())
                            {
                                await imageDataFile.CopyToAsync(stream);

                                // 創建一個新的PersonalPhoto對象，設置GroupID和PhotoData，然後保存到資料庫
                                var newPhoto = new PersonalPhoto
                                {
                                    GroupID = @group.GroupID,
                                    PhotoData = stream.ToArray() // 將圖片資料存入PhotoData
                                };


                                // 將PersonalPhoto存入資料庫
                                _context.PersonalPhoto.Add(newPhoto);
                                await _context.SaveChangesAsync();
                            }
                        }
                    }
                }
                return Ok("success"); ;
            }
            // 如果有驗證錯誤，返回錯誤信息
            return BadRequest(new { status = "error" });

        }




        //----------------------------------以下沒用到的-----------------------------------

        // GET: Groups/Edit/5
        public async Task<IActionResult> Edit(int? id)
{
    if (id == null || _context.Group == null)
    {
        return NotFound();
    }

    var @group = await _context.Group.FindAsync(id);

    if (@group == null)
    {
        return NotFound();
    }

    MemberUseViewModel model = new MemberUseViewModel();
    model.GroupID = @group.GroupID;

    // 其他需要的初始化...

    if (_context.Member != null)
    {
        ViewData["Organizer"] = new SelectList(_context.Member, "UserID", "UserID", @group?.Organizer);
    }

    return View("Create", model);  // 注意這裡傳遞的是 model，而不是 @group
}






        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("GroupID,GroupName,GroupCategory,GroupContent,MinAttendee,MaxAttendee,StartDate,EndDate,Organizer,OriginalActivityID")] Group @group, List<IFormFile> imageDataFiles)
        {
            if (id != @group.GroupID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(@group);

                    // ... [略去上傳圖片的代碼]

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GroupExists(@group.GroupID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["Organizer"] = new SelectList(_context.Member, "UserID", "UserID", @group.Organizer);
            // ViewData["OriginalActivityID"] = new SelectList(_context.MyActivity, "ActivityID", "ActivityID", @group.OriginalActivityID);

            // 返回Edit視圖，並傳遞group對象，讓使用者可以重新編輯
            return View("Create", "Groups");
        }


        // GET: Groups/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Group == null)
            {
                return NotFound();
            }

            var @group = await _context.Group
                .FirstOrDefaultAsync(m => m.GroupID == id);
            if (@group == null)
            {
                return NotFound();
            }

            return View(@group);
        }

        // POST: Groups/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Group == null)
            {
                return Problem("Entity set 'ProjectXContext.Group'  is null.");
            }
            var @group = await _context.Group.FindAsync(id);
            if (@group != null)
            {
                _context.Group.Remove(@group);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool GroupExists(int id)
        {
            return (_context.Group?.Any(e => e.GroupID == id)).GetValueOrDefault();
        }
    }
}
