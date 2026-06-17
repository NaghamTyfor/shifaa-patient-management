<?php

namespace Database\Seeders;

use App\Models\Disease;
use Illuminate\Database\Seeder;

class DiseaseSeeder extends Seeder
{
    public function run(): void
    {
        $diseases = [
            'ربو تحسسي',
            'سكري التراكمي',
            'سكري من النوع الثاني',
            'ضغط شرياني مرتفع',
            'خشونة المفاصل',
            'هشاشة العظام المزمنة',
            'جفاف العين الشديد',
            'خمول الغدة الدرقية',
            'داء النقرس الحاد',
            'روماتيزم مفاصل',
        ];

        foreach ($diseases as $disease) {
            Disease::create(['name' => $disease]);
        }
    }
}
