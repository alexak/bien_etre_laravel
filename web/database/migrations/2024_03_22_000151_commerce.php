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
        Schema::create('commerces', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->string('image');
            $table->tinyInteger('rating')
                ->nullable();
            $table->boolean('isAtHome')
                ->default(false);
            $table->boolean('isAtStore')
                ->default(true);
            $table->string('address_1')
                ->nullable();
            $table->string('address_2')
                ->nullable();            
            //$table->foreignId('city_id')
            //    ->nullable()
            //    ->constrained('cities')
            //    ->onDelete('set null');
            $table->geometry('position');
            $table->foreignId('manager_user_id')
                ->nullable() 
                ->constrained('users')
                ->onDelete('set null');
            $table->string('contact_mail')
                ->nullable();
            $table->string('contact_phone')
                ->nullable();
            $table->foreignId('maincategory_id')
                ->nullable() 
                ->constrained('categories')
                ->onDelete('set null');
   
            $table->index(['maincategory_id']);
            $table->spatialIndex(['position']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('commerces');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
