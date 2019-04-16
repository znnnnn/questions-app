<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Predis\Client;

class LoginController extends BaseController
{
    /**
     * 手机验证码登录
     * @param Request $request phone;code
     * @return array|bool  {status=0,message='',data:[api_token=xxxxx]};status=1:手机未填写;status=2:验证码未填写;status=3:验证码错误;
     */
    public function loginSms(Request $request)
    {
        if (!$request->phone) {
            return $this->message(1, '手机未填写');
        }
        if (!$request->code) {
            return $this->message(2, '验证码未填写');
        }
        $phone = $request->phone;
        if (!$this->tellCode($phone, $request->code)) {
            return $this->message(3, '验证码错误');
        }
        $user = (new User())->where('phone', $phone)->first();
        if (!$user) {
            return false;
        }
        $user = $this->updateApiToken($user);
        return $this->message(0, '', ['api_token' => $user->api_token]);
    }


}
