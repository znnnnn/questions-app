<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;

class RegisterController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'phone' => 'required|regex:/^1[34578][0-9]{9}$/',
            'password' => 'required|string|min:6|max:14',
        ]);
    }

    /**
     * @param Request $request code:验证码;phone:手机号;password:密码
     * @return array    {status=0,message=注册成功,data:[api_token=xxxxx]};status=1:手机未填写;status=2:验证码未填写;status=3:验证码错误;status=4:改手机号已被注册;
     */
    public function register(Request $request)
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
        if ($user) return $this->message(4, '该手机号已被注册');
        event(new Registered($user = $this->create($request->all())));
        return $this->message(0, '注册成功', ['api_token' => $user->api_token]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'api_token' => (time() + (60 * 60 * 24 * $this->token_expired_time)) . '.' . str_random(64),
        ]);
    }
}
