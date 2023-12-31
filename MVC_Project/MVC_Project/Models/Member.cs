﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MVC_Project.Models;

public partial class Member
{
    public bool IsActive { get; set; } 
    public int UserID { get; set; }

    public string Nickname { get; set; }

    public string Account { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string Phone { get; set; }

    public string Intro { get; set; }

    public byte[] UserPhoto { get; set; }

    public virtual ICollection<Chat> Chat { get; set; } = new List<Chat>();

    public virtual ICollection<Group> Group { get; set; } = new List<Group>();

    public virtual ICollection<LikeRecord> LikeRecord { get; set; } = new List<LikeRecord>();

    public virtual ICollection<Notification> Notification { get; set; } = new List<Notification>();

    public virtual ICollection<Registration> Registration { get; set; } = new List<Registration>();

    public virtual ICollection<VoteRecord> VoteRecord { get; set; } = new List<VoteRecord>();
}