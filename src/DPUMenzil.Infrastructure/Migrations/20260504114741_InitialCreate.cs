using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DPUMenzil.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kategoriler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Ad = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoriler", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kullanicilar",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AdSoyad = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Eposta = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    SifreHash = table.Column<string>(type: "text", nullable: false),
                    Rol = table.Column<int>(type: "integer", nullable: false),
                    KayitTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kullanicilar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gonderiler",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Baslik = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Icerik = table.Column<string>(type: "text", nullable: false),
                    Tur = table.Column<int>(type: "integer", nullable: false),
                    Durum = table.Column<int>(type: "integer", nullable: false),
                    AnonimMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    KategoriId = table.Column<int>(type: "integer", nullable: false),
                    OlusturulmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gonderiler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gonderiler_Kategoriler_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "Kategoriler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Gonderiler_Kullanicilar_OlusturanKullaniciId",
                        column: x => x.OlusturanKullaniciId,
                        principalTable: "Kullanicilar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gonderiler_KategoriId",
                table: "Gonderiler",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Gonderiler_OlusturanKullaniciId",
                table: "Gonderiler",
                column: "OlusturanKullaniciId");

            migrationBuilder.CreateIndex(
                name: "IX_Kullanicilar_Eposta",
                table: "Kullanicilar",
                column: "Eposta",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gonderiler");

            migrationBuilder.DropTable(
                name: "Kategoriler");

            migrationBuilder.DropTable(
                name: "Kullanicilar");
        }
    }
}
