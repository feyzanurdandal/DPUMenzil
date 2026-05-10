using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DPUMenzil.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateKullaniciNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Kullanicilar_Eposta",
                table: "Kullanicilar");

            migrationBuilder.DropColumn(
                name: "Eposta",
                table: "Kullanicilar");

            migrationBuilder.RenameColumn(
                name: "AdSoyad",
                table: "Kullanicilar",
                newName: "Email");

            migrationBuilder.AddColumn<string>(
                name: "Ad",
                table: "Kullanicilar",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OgrenciNo",
                table: "Kullanicilar",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Soyad",
                table: "Kullanicilar",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Kullanicilar_Email",
                table: "Kullanicilar",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Kullanicilar_Email",
                table: "Kullanicilar");

            migrationBuilder.DropColumn(
                name: "Ad",
                table: "Kullanicilar");

            migrationBuilder.DropColumn(
                name: "OgrenciNo",
                table: "Kullanicilar");

            migrationBuilder.DropColumn(
                name: "Soyad",
                table: "Kullanicilar");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Kullanicilar",
                newName: "AdSoyad");

            migrationBuilder.AddColumn<string>(
                name: "Eposta",
                table: "Kullanicilar",
                type: "character varying(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Kullanicilar_Eposta",
                table: "Kullanicilar",
                column: "Eposta",
                unique: true);
        }
    }
}
