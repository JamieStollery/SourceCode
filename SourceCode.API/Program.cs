using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SourceCode.API.Models;
using SourceCode.API.OAuth;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQLite database
var folder = Environment.SpecialFolder.LocalApplicationData;
var path = Environment.GetFolderPath(folder);
var dbPath = Path.Join(path, "clients.db");
builder.Services.AddDbContext<ClientContext>(options => options.UseSqlite($"Data Source={dbPath}"));
builder.Services.AddDbContext<UserContext>(options => options.UseSqlite($"Data Source={dbPath}"));

// Add JWT token builder
var jwtTokenBuilder = new JwtTokenBuilder(builder.Configuration.GetValue<string>("JwtSecret"));
builder.Services.AddTransient<IJwtTokenBuilder>(sp => jwtTokenBuilder);

// Define JWT options
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuer = false,
           ValidateAudience = false,
           ValidateLifetime = false,
           ValidateIssuerSigningKey = true,

           IssuerSigningKey = jwtTokenBuilder.JwtSecurityKey
       };
       options.Events = new JwtBearerEvents
       {
           OnTokenValidated = context =>
           {
               // Get token
               var token = context.SecurityToken as JwtSecurityToken;
               // Add user context
               context.HttpContext.Items["user"] = token?.Claims.SingleOrDefault(claim => claim.Type == "user")?.Value;

               return Task.CompletedTask;
           }
       };
   });

// Add User policy
builder.Services.AddAuthorization(options => options.AddPolicy("User",
    policy =>
    {
        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
        policy.RequireClaim("user");
    })
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
