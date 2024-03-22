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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')
                ->nullable();
            $table->unsignedDecimal('price', $precision = 8, $scale = 2);
            $table->smallInteger('duration')
                ->nullable();
            $table->foreignId('category_id')
                ->constrained('categories')
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
        Schema::dropIfExists('commerce_services');
    }
};
