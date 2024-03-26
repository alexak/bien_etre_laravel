<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\Storage;

class CommercesSeeder extends Seeder
{
    public function run()
    {
        $faker = FakerFactory::create();

        $jsonData = Storage::get('public/export.json');
        $hairdressers = json_decode($jsonData, true);

        foreach ($hairdressers['elements'] as $hairdresser) {
            $tags = $hairdresser['tags'];
            $position = DB::raw(sprintf("POINT(%f, %f)", $hairdresser['lon'], $hairdresser['lat']));

            $address_1 = '';
            if (array_key_exists('contact:street', $tags) && array_key_exists('contact:housenumber', $tags)) {
              $address_1 = $tags['contact:street'] . ' ' . $tags['contact:housenumber'];
            }

            $commerceData = [
                'name' => array_key_exists('name', $tags) ? $tags['name'] : null,
                'description' => $faker->paragraph(2), // Replace with appropriate value if available in JSON
                'image' => "https://picsum.photos/300?random=" . uniqid(),
                'rating' => rand(0, 5) <= 1 ? null : rand(1, 5), // Replace with appropriate value if available in JSON (consider average of user reviews)
                'isAtHome' => false,  // Assuming hairdressers are not at-home businesses (adjust if needed)
                'isAtStore' => true,   // Assuming hairdressers have a physical store (adjust if needed)
                'address_1' => $address_1, // Can be populated from address components if available in JSON
                'address_2' => null, // Can be populated from address components if available in JSON
                'position' => $position,
                'manager_user_id' => null, // Might need to be populated based on your user management system
                'contact_mail' => null, // Can be populated from contact details if available in JSON
                'contact_phone' => (array_key_exists('phone', $tags) ? $tags['phone'] : null) 
                    ?? (array_key_exists('contact:phone', $tags) ? $tags['contact:phone'] : null),
                'maincategory_id' => 4,
            ];

            // Insert data into the commerces table
            DB::table('commerces')->insert($commerceData);
        }
    }
}
