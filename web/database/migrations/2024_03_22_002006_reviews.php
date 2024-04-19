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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('rating'); 
            $table->text('comment');
            $table->smallInteger('rating_price'); 
            $table->smallInteger('rating_professionalism'); 
            $table->smallInteger('rating_cleanliness'); 
            $table->smallInteger('rating_kindness'); 
            $table->smallInteger('rating_quality'); 
            $table->smallInteger('upvoting'); 
            $table->foreignId('user_id')
                ->nullable() 
                ->constrained('users')
                ->onDelete('set null');
            $table->foreignId('commerce_id')
                ->constrained('commerces')
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
