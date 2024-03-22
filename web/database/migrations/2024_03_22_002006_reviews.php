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
        Schema::create('user_reviews', function (Blueprint $table) {
            $table->id();
            $table->text('comment');
            $table->smallInteger('rating'); // Changed 'quote' to 'rating' for clarity
            $table->foreignId('user_id')
                ->nullable() // Ensure this column is nullable
                ->constrained('users')
                ->onDelete('set null');
            $table->foreignId('commerce_id')
                ->constrained('commerces') // Ensure the table name is correct
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_reviews');
    }
};
