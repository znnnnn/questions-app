<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\Career;
use Illuminate\Http\Request;

class CareerController extends BaseController
{
    public function list()
    {
        $base = [['id' => 0, 'name' => '公民']];
        $list = Career::getAll();
        foreach ($list as $v) {
            $base[] = $v;
        }
        return $this->message(0, '', $base);
    }
}
