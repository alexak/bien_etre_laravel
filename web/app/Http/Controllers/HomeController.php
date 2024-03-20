<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Show the application's homepage.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Homepage');
    }
}
