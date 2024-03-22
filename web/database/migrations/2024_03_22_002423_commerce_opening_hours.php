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
        Schema::create('commerce_opening_hours', function (Blueprint $table) {
            $table->id();
            $table->text('comment')->nullable();
            $table->smallInteger('day_of_week');
            $table->time('opening_time');
            $table->time('closing_time');
            $table->date('special_date')->nullable();
            $table->foreignId('commerce_id')
                ->constrained('commerces')
                ->onDelete('cascade');
            $table->timestamps();

            // Specify a custom index name to avoid exceeding the maximum length
            $table->index(['day_of_week', 'special_date', 'commerce_id'], 'commerce_hours_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commerce_opening_hours');
    }
};
