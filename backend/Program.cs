using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using backend;
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

DotNetEnv.Env.Load();

var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
var botToken = Environment.GetEnvironmentVariable("TG_TOKEN");

if (string.IsNullOrWhiteSpace(issuer) || string.IsNullOrWhiteSpace(audience) || string.IsNullOrWhiteSpace(secretKey))
{
    throw new InvalidOperationException("Переменные окружения JWT_ISSUER, JWT_AUDIENCE или JWT_SECRET_KEY не заданы или пусты.");
}

if (string.IsNullOrWhiteSpace(botToken))
{
    throw new InvalidOperationException("Переменная окружения TG_TOKEN не задана.");
}

builder.Services.AddSingleton(new JwtService(secretKey, issuer, audience));

// JWT аутентификация
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();


builder.Services.AddSingleton<TGbot>(provider => new TGbot(botToken));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BILINGA API",
        Version = "v1",
        Description = "API Documentation with Swagger"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Введите токен JWT в формате: Bearer <token>"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

var bot = app.Services.GetRequiredService<TGbot>();
Task.Run(() => bot.Start());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "BILINGA API v1");
        options.RoutePrefix = string.Empty; 
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
