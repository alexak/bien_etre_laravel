<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image');
            $table->text('description');
            $table->string('slug')->unique();
            $table->foreignId('parent_category_id')
                ->nullable()
                ->constrained('categories')
                ->onDelete('set null');
            $table->timestamps();
        });

        // Optional: Include the seed data insert within the migration
        $categories = [
            ['title' => 'Aromathérapie', 'image' => '/images/categories/aromatherapie.png', 'description' => 'Trouvez un aromathérapeute certifié près de chez vous pour une consultation personnalisée.', 'slug' => 'aromatherapie'],
            ['title' => 'Art', 'image' => '/images/categories/art.png', 'description' => 'Exprimez votre créativité avec des cours de peinture, dessin, sculpture et plus encore.', 'slug' => 'art'],
            ['title' => 'Fitness', 'image' => '/images/categories/fitness.png', 'description' => 'Atteignez vos objectifs de remise en forme avec un coach sportif personnel.', 'slug' => 'fitness'],
            ['title' => 'Coiffeur', 'image' => '/images/categories/coiffeur.png', 'description' => 'Prenez rendez-vous en ligne pour une coupe ou une coloration tendance', 'slug' => 'coiffeur'],
            ['title' => 'Hypnose', 'image' => '/images/categories/hypnose.png', 'description' => "Libérez-vous du stress, des phobies et des addictions grâce à l'hypnose thérapeutique.", 'slug' => 'hypnose'],
            ['title' => 'Massage', 'image' => '/images/categories/massage.png', 'description' => 'Offrez-vous un moment de détente et de bien-être dans un spa ou un institut de beauté.', 'slug' => 'massage'],
            ['title' => 'Meditation', 'image' => '/images/categories/meditation.png', 'description' => 'Découvrez différentes techniques de méditation pour trouver celle qui vous convient.', 'slug' => 'meditation'],
            ['title' => 'Beauté', 'image' => '/images/categories/beaute.png', 'description' => 'Bénéficiez de conseils personnalisés pour votre beauté par une esthéticienne.', 'slug' => 'beaute'],
            ['title' => 'Nutrition', 'image' => '/images/categories/nutrition.png', 'description' => "Adoptez une alimentation saine et équilibrée avec l'aide d'un nutritionniste.", 'slug' => 'nutrition'],
            ['title' => 'Yoga', 'image' => '/images/categories/yoga.png', 'description' => 'Renforcez votre corps et votre esprit avec des cours de yoga pour tous niveaux.', 'slug' => 'yoga'],
        ];

        foreach($categories as $category){
            DB::table('categories')->insert($category);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
