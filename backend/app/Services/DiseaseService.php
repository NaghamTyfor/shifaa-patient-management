<?php

namespace App\Services;

use App\Models\Disease;

class DiseaseService
{
    public function getAll()
    {
        return Disease::orderBy('name')->get();
    }
}
