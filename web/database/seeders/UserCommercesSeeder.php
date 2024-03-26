<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Commerce;
use App\Models\User;

class UserCommercesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define the number of user-commerce relationships to create
        $count = 10; // Change this to the desired number

        // Get all commerce IDs
        $commerceIds = Commerce::pluck('id')->toArray();

        // Check if there are any commerces to link
        if (count($commerceIds)===0) {
            $this->command->info('No commerces found. Skipping UserCommerces seeder.');
            return;
        }

        // Generate random user IDs (assuming you have a 'users' table)
        $userIds = range(1, User::count()); // Replace with your user ID retrieval logic

        // Seed user-commerce relationships
        for ($i = 0; $i < $count; $i++) {
            $userId = $userIds[array_rand($userIds)];
            $commerceId = $commerceIds[array_rand($commerceIds)];

            DB::table('users_commerces')->insert([
                'user_id' => $userId,
                'commerces_id' => $commerceId,
            ]);
        }

        $this->command->info('Seeded ' . $count . ' user-commerce relationships.');
    }
}
