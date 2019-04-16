<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Model\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class MyLoginController extends BaseController
{
//    use RegistersUsers;
//    use AuthenticatesUsers;

//    protected $redirectTo = '/home';

//    public function __construct()
//    {
//        $this->middleware('guest');
//    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'phone' => 'required|regex:/^1[34578][0-9]{9}$/',
        ]);
    }

    /**
     * @param Request $request phone;code
     * @return false|string
     */
    public function fastLogin(Request $request)
    {
        if (!$request->phone) {
            return $this->message(1, '手机号未填写');
        }
        if (!$request->code) {
            return $this->message(2, '验证码未填写');
        }
        $this->validator($request->all())->validate();
        $phone = $request->phone;
        if (!$this->tellCode($phone, $request->code)) {
            return $this->message(3, '验证码错误');
        }
        $user = User::where('phone', $phone)->first();
        if ($user) {
            $user->api_token = (time() + (60 * 60 * 24 * $this->token_expired_time)) . '.' . str_random(64);
            $user->save();
            return $this->message(0, '登录成功', ['api_token' => $user->api_token]);
        } else {
            $newuser = new User();
            $newuser->phone = $phone;
            $newuser->password = '';
            $newuser->api_token = (time() + (60 * 60 * 24 * $this->token_expired_time)) . '.' . str_random(64);
            $newuser->save();
            return $this->message(0, '注册成功', ['api_token' => $newuser->api_token]);
        }
    }
}
