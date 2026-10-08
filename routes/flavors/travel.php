<?php

use App\Http\Controllers\Web\TravelController;
use Illuminate\Support\Facades\Route;

Route::prefix('travel')->name('travel.')->group(function () {
    Route::get('/', [TravelController::class, 'index'])->name('index');
    Route::get('/paket', [TravelController::class, 'paket'])->name('paket');
    Route::get('/booking', [TravelController::class, 'booking'])->name('booking');
    Route::get('/manifest', [TravelController::class, 'manifest'])->name('manifest');
    Route::get('/agen', [TravelController::class, 'agen'])->name('agen');
    Route::get('/laporan', [TravelController::class, 'laporan'])->name('laporan');
});
