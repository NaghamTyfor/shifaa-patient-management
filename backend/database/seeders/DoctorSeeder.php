<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'dr.nagham',
            'email' => 'doctor@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}
