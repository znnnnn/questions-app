<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConfigurationController extends BaseController
{
    public function list()
    {
        $config = Configuration::all();
        return $this->_message(0, '', $config, count($config));
    }

    public function update(Request $request)
    {
        if (!$request->id) exit();
        $config = Configuration::find($request->id);
        $config->content = $request->input('content');
        $config->save();
        Log::info('修改配置', json_decode(json_encode($config), true));
        return $this->message(0);
    }
}
