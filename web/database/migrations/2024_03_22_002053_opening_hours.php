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
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->id();
            $table->text('comment')->nullable(); // Consider if comments are mandatory
            $table->smallInteger('day_of_week');
            $table->time('opening_time');
            $table->time('closing_time');
            $table->date('special_date')->nullable();
            $table->foreignId('commerce_id')
                ->constrained('commerces')
                ->onDelete('cascade');
            $table->timestamps();

            // Optional: Add indexes for potentially frequently queried columns
            $table->index(['day_of_week', 'special_date', 'commerce_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opening_hours');
    }
};
