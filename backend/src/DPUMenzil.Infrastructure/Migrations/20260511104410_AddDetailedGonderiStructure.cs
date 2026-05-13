using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DPUMenzil.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDetailedGonderiStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gonderiler_Kategoriler_KategoriId",
                table: "Gonderiler");

            migrationBuilder.DropForeignKey(
                name: "FK_Gonderiler_Kullanicilar_OlusturanKullaniciId",
                table: "Gonderiler");

            migrationBuilder.AlterColumn<string>(
                name: "Tur",
                table: "Gonderiler",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Durum",
                table: "Gonderiler",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<Guid>(
                name: "KategoriId1",
                table: "Gonderiler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "KullaniciId",
                table: "Gonderiler",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Gonderiler_KategoriId1",
                table: "Gonderiler",
                column: "KategoriId1");

            migrationBuilder.CreateIndex(
                name: "IX_Gonderiler_KullaniciId",
                table: "Gonderiler",
                column: "KullaniciId");

            migrationBuilder.AddForeignKey(
                name: "FK_Gonderiler_Kategoriler_KategoriId",
                table: "Gonderiler",
                column: "KategoriId",
                principalTable: "Kategoriler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Gonderiler_Kategoriler_KategoriId1",
                table: "Gonderiler",
                column: "KategoriId1",
                principalTable: "Kategoriler",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Gonderiler_Kullanicilar_KullaniciId",
                table: "Gonderiler",
                column: "KullaniciId",
                principalTable: "Kullanicilar",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Gonderiler_Kullanicilar_OlusturanKullaniciId",
                table: "Gonderiler",
                column: "OlusturanKullaniciId",
                principalTable: "Kullanicilar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gonderiler_Kategoriler_KategoriId",
                table: "Gonderiler");

            migrationBuilder.DropForeignKey(
                name: "FK_Gonderiler_Kategoriler_KategoriId1",
                table: "Gonderiler");

            migrationBuilder.DropForeignKey(
                name: "FK_Gonderiler_Kullanicilar_KullaniciId",
                table: "Gonderiler");

            migrationBuilder.DropForeignKey(
                name: "FK_Gonderiler_Kullanicilar_OlusturanKullaniciId",
                table: "Gonderiler");

            migrationBuilder.DropIndex(
                name: "IX_Gonderiler_KategoriId1",
                table: "Gonderiler");

            migrationBuilder.DropIndex(
                name: "IX_Gonderiler_KullaniciId",
                table: "Gonderiler");

            migrationBuilder.DropColumn(
                name: "KategoriId1",
                table: "Gonderiler");

            migrationBuilder.DropColumn(
                name: "KullaniciId",
                table: "Gonderiler");

            migrationBuilder.AlterColumn<int>(
                name: "Tur",
                table: "Gonderiler",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Durum",
                table: "Gonderiler",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Gonderiler_Kategoriler_KategoriId",
                table: "Gonderiler",
                column: "KategoriId",
                principalTable: "Kategoriler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Gonderiler_Kullanicilar_OlusturanKullaniciId",
                table: "Gonderiler",
                column: "OlusturanKullaniciId",
                principalTable: "Kullanicilar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
