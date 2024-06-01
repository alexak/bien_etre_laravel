<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->char('country_code', 2);
            $table->string('postal_code', 20);
            $table->string('place_name', 180);
            $table->string('admin_name1', 100);
            $table->string('admin_code1', 20);
            $table->string('admin_name2', 100)->nullable();
            $table->string('admin_code2', 20)->nullable();
            $table->string('admin_name3', 100)->nullable();
            $table->string('admin_code3', 20)->nullable();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->integer('accuracy');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
