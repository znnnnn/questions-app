<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Model\Admin;
use Illuminate\Support\Facades\Log;

class LoginController extends BaseController
{
    public function getHashPsd(Request $request)
    {
        dd(Hash::make($request->pwd));
    }

    public function index()
    {
        return view('admin.login');
    }

    /**
     * 登录
     * @param Request $request code;account;password
     * @return string
     */
    public function login(Request $request)
    {
        if (session('code') == $request->code) {
            $request->session()->pull('code');
            $acc = $request->account;
            $pwd = $request->password;
            $admin = (new Admin())->where('account', $acc)->first();
            if ($admin) {
                if (Hash::check($pwd, $admin->password)) {
                    $request->session()->put([
                        'admin_id' => $admin->id,
                        'admin_account' => $admin->account,
                        'login_at' => $admin->login_at,
                    ]);
                    $request->session()->save();
                    $admin->login_at = Carbon::now();
                    $admin->save();
                    Log::info('登录成功', ['ip' => $request->getClientIp(), 'admin' => json_decode(json_encode($admin), true)]);
                    return $this->message(0);
                } else {
                    Log::info('登录失败：账号或密码错误', ['ip' => $request->getClientIp()]);
                    return $this->message(2, '账号或密码错误');
                }
            } else {
                Log::info('登录失败：账号或密码错误', ['ip' => $request->getClientIp()]);
                return $this->message(2, '账号或密码错误');
            }
        } else return $this->message(1, '验证码错误');
    }

    public function logout(Request $request)
    {
        $request->session()->flush();
        return $this->message(0);
    }
}
