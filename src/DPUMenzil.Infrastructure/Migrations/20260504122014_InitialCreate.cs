using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

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
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Ad = table.Column<string>(type: "text", nullable: false),
                    Aciklama = table.Column<string>(type: "text", nullable: true)
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
                    KategoriId = table.Column<Guid>(type: "uuid", nullable: false),
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

            migrationBuilder.InsertData(
                table: "Kategoriler",
                columns: new[] { "Id", "Aciklama", "Ad" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-4a1b-8c2d-1e2f3a4b5c6d"), "Yemek listesi ve kalite geri bildirimleri", "Yemekhane" },
                    { new Guid("b2c3d4e5-f6a1-4b2c-9d3e-2f3a4b5c6d7e"), "Kampüs içi ulaşım ve saatler", "Ring Seferleri" },
                    { new Guid("c3d4e5f6-a1b2-4c3d-0e4f-3a4b5c6d7e8f"), "Çalışma alanları ve kaynaklar", "Kütüphane" },
                    { new Guid("d4e5f6a1-b2c3-4d4e-1f5a-4b5c6d7e8f9a"), "Kampüs güvenliği ve acil durumlar", "Güvenlik" },
                    { new Guid("e5f6a1b2-c3d4-4e5f-2a6b-5c6d7e8f9a0b"), "Dersler ve sınav süreçleri hakkında", "Akademik" }
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
