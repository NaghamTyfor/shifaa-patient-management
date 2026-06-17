<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DiseaseService;

class DiseaseController extends Controller
{
    public function __construct(
        protected DiseaseService $diseaseService
    ) {}

    public function index()
    {
        $diseases = $this->diseaseService->getAll();
        return response()->json($diseases);
    }
}
