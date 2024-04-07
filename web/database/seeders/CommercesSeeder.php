<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use MatanYadaev\EloquentSpatial\Objects\Point;
use App\Models\Commerce;



class CommercesSeeder extends Seeder
{

    private $slugs = [];

    public function run()
    {
        $faker = FakerFactory::create();

        $jsonData = Storage::get('public/export.json');
        $hairdressers = json_decode($jsonData, true);

        foreach ($hairdressers['elements'] as $hairdresser) {
            $tags = $hairdresser['tags'];

            $address1 = '';
            if (array_key_exists('contact:street', $tags) && array_key_exists('contact:housenumber', $tags)) {
              $address1 = $tags['contact:street'] . ' ' . $tags['contact:housenumber'];
            }

            $commerce = new Commerce();

            $commerce->name = array_key_exists('name', $tags) ? $tags['name'] : null;
            $commerce->slug = $this->createUniqueSlug($commerce->name);
            $commerce->description = $faker->paragraph(2);
            $commerce->image = "https://picsum.photos/300?random=" . uniqid();
            $commerce->rating = rand(0, 5) <= 1 ? null : rand(1, 5);
            $commerce->isAtHome = false;
            $commerce->isAtStore = true;
            $commerce->address_1 = $address1;
            $commerce->address_2 = null;
            //$commerce->location = new Point(51.5032973, -0.1217424); // Assuming Point is a model or class representing location
            $commerce->location = new Point($hairdresser['lat'], $hairdresser['lon']); // Assuming Point is a model or class representing location
            $commerce->manager_user_id = null;
            $commerce->contact_mail = null;
            $commerce->contact_phone = (array_key_exists('phone', $tags) ? $tags['phone'] : null) 
                ?? (array_key_exists('contact:phone', $tags) ? $tags['contact:phone'] : null);
            $commerce->maincategory_id = 4;

            $commerce->save();
        }
    }

    /** 
     * Function to create a unique slug
     */
    private function createUniqueSlug(string $name): string
    {
        $slug = Str::slug($name, '-');
        $baseSlug = $slug;
        $counter = 1;
        do {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        } while(in_array($slug, $this->slugs));

        $this->slugs[] = $slug;
        return $slug;
    }     
}


