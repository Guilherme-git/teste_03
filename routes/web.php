<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;


Route::get('/', function () {
    return view('index');
});

Route::post('/export', [IndexController::class,'export']);
