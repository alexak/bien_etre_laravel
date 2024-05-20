<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OpeningHoursSeeder extends Seeder
{
    public function run()
    {
        $commerceId = 5;

        // Regular opening hours (Monday to Friday)
        $regularHours = [
            ['day_of_week' => 1, 'opening_time' => '09:00:00', 'closing_time' => '12:00:00'],
            ['day_of_week' => 1, 'opening_time' => '14:00:00', 'closing_time' => '18:00:00'],
            ['day_of_week' => 2, 'opening_time' => '09:00:00', 'closing_time' => '12:00:00'],
            ['day_of_week' => 2, 'opening_time' => '14:00:00', 'closing_time' => '18:00:00'],
            ['day_of_week' => 3, 'opening_time' => '09:00:00', 'closing_time' => '12:00:00'],
            ['day_of_week' => 4, 'opening_time' => '09:00:00', 'closing_time' => '12:00:00'],
            ['day_of_week' => 4, 'opening_time' => '14:00:00', 'closing_time' => '18:00:00'],
            ['day_of_week' => 5, 'opening_time' => '09:00:00', 'closing_time' => '12:00:00'],
            ['day_of_week' => 5, 'opening_time' => '14:00:00', 'closing_time' => '18:00:00'],
        ];

        // Special opening hours
        $specialHours = [
            ['special_date' => '2024-12-24', 'opening_time' => '09:00:00', 'closing_time' => '13:00:00'],
            ['special_date' => '2024-12-25', 'opening_time' => null, 'closing_time' => null], // Closed
            ['special_date' => '2024-12-31', 'opening_time' => '09:00:00', 'closing_time' => '11:00:00'],
        ];

        // Insert regular hours
        foreach ($regularHours as $hours) {
            DB::table('opening_hours')->insert([
                'comment' => null,
                'day_of_week' => $hours['day_of_week'],
                'opening_time' => $hours['opening_time'],
                'closing_time' => $hours['closing_time'],
                'special_date' => null,
                'commerce_id' => $commerceId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        // Insert special hours
        foreach ($specialHours as $hours) {
            DB::table('opening_hours')->insert([
                'comment' => null,
                'day_of_week' => null,
                'opening_time' => $hours['opening_time'],
                'closing_time' => $hours['closing_time'],
                'special_date' => $hours['special_date'],
                'commerce_id' => $commerceId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
