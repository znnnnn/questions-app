<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TestController extends BaseController
{
    public function test()
    {
        return $this->message(0, 'success');
    }

    public function test1()
    {
        return $_SERVER;
    }
}
