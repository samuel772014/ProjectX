﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MVC_Project.Models;

public partial class MyActivity
{
    public int ActivityID { get; set; }

    public string ActivityName { get; set; }

    public string Category { get; set; }

    public decimal? SuggestedAmount { get; set; }

    public string ActivityContent { get; set; }

    public int? MinAttendee { get; set; }

    public DateTime? VoteDate { get; set; }

    public DateTime? ExpectedDepartureMonth { get; set; }

    public virtual ICollection<Group> Group { get; set; } = new List<Group>();

    public virtual ICollection<LikeRecord> LikeRecord { get; set; } = new List<LikeRecord>();

    public virtual ICollection<OfficialPhoto> OfficialPhoto { get; set; } = new List<OfficialPhoto>();

    public virtual ICollection<VoteRecord> VoteRecord { get; set; } = new List<VoteRecord>();

    public virtual ICollection<VoteTime> VoteTime { get; set; } = new List<VoteTime>();
}