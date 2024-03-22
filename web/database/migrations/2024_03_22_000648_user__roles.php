<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

 
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Ensure role names are unique
            $table->timestamps(); // Add created_at and updated_at columns
        });

        // Insert the initial roles directly
        DB::table('user_roles')->insert([
            ['name' => 'Admin'],
            ['name' => 'ShopOwner'],
            ['name' => 'User'],
        ]);
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_roles'); // Safer for rolling back migrations
    }
};
