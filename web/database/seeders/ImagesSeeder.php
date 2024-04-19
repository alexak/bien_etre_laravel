<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use Faker\Factory as FakerFactory;


class ImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = FakerFactory::create();

        for($i=0; $i<10; $i++) {
            $image = new Image();
            $image->alt = $faker->word();
            $image->commerce_id = 5;
            $image->name = "https://picsum.photos/300?random=" . uniqid();
            $image->save();
        }
    }
}