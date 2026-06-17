<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DiseaseController;
use App\Http\Controllers\Api\PatientController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::delete('/patients/bulk', [PatientController::class, 'destroyMultiple']);

    Route::apiResource('patients', PatientController::class)->only([
        'index', 'store', 'show', 'update', 'destroy'
    ]);
    Route::get('/diseases', [DiseaseController::class, 'index']);

});
