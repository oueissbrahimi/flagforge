<?php

use App\Http\Controllers\Api\ChallengeController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/challenges', [ChallengeController::class, 'index']);
    Route::post('/challenges', [ChallengeController::class, 'store']);
    Route::post('/challenges/{challenge}/submit', [ChallengeController::class, 'submitFlag']);
});
