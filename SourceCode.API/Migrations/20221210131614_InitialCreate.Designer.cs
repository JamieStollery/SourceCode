﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SourceCode.API.Models;

#nullable disable

namespace SourceCode.API.Migrations
{
    [DbContext(typeof(ClientContext))]
    [Migration("20221210131614_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("SourceCode.API.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("DirectorName")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Website")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });
#pragma warning restore 612, 618
        }
    }
}
