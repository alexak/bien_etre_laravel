<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = storage_path('app/public/cities.csv');
        $file = fopen($filePath, 'r');

        $batchSize = 1000; // Adjust the batch size according to your needs
        $data = [];

        while (($row = fgetcsv($file, 0, "\t")) !== false) {
            $data[] = [
                'country_code' => $row[0],
                'postal_code' => $row[1],
                'place_name' => $row[2],
                'admin_name1' => $row[3],
                'admin_code1' => $row[4],
                'admin_name2' => $row[5],
                'admin_code2' => $row[6],
                'admin_name3' => $row[7] ?? null,
                'admin_code3' => $row[8] ?? null,
                'latitude' => $row[9],
                'longitude' => $row[10],
                'accuracy' => $row[11],
            ];

            if (count($data) >= $batchSize) {
                DB::table('cities')->insert($data);
                $data = [];
            }
        }

        // Insert any remaining data
        if (!empty($data)) {
            DB::table('cities')->insert($data);
        }

        fclose($file);

        DB::table('cities')->update([
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
