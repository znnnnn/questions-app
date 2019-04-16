<?php

namespace App\Http\Controllers\Admin;

use Gregwar\Captcha\CaptchaBuilder;
use App\Http\Controllers\Controller;

class CommonController extends Controller
{
    public function Captcha()
    {
        $builder = new CaptchaBuilder();
        $builder->build('116', 36);
        session(['code' => $builder->getPhrase()]);
        header('Content-type: image/jpeg');
        $builder->output();
    }
}
