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
        Schema::create('commerces', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->string('image');
            $table->tinyInteger('rating');
            $table->boolean('isAtHome');
            $table->boolean('isAtStore');
            $table->string('address_1');
            $table->string('address_2');            
            $table->foreignId('city_id')
                ->nullable()
                ->constrained('cities')
                ->onDelete('set null');
            $table->geometry('position');
            $table->foreignId('manager_user_id')
                ->nullable() 
                ->constrained('users')
                ->onDelete('set null');
            $table->string('contact_mail');
            $table->string('contact_phone');
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
        //
    }
};
