<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/welcome', function () {
    return view('welcome',[
        'public_key' => 'c84ad754c728bfb10af2c1c3d1594106'
        ]);
});

Route::get('/employee', 'App\Http\Controllers\EmployeeController@index');
Route::get('/employee/index', 'App\Http\Controllers\EmployeeController@index')->name('employee_index');
Route::get('/employee/list', 'App\Http\Controllers\EmployeeController@index');
Route::get('/employee/form', 'App\Http\Controllers\EmployeeController@index');
Route::get('/employee/edit/{num}', 'App\Http\Controllers\EmployeeController@index');
