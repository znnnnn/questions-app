<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    /**
     * 用户信息，包含行业
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function info()
    {
        $user = Auth::user();
        if ($user->career_id == 0) {
            $user->career =
                [
                    'name' => '公民',
                ];
        } else
            $user->career;
        return $this->message(0, '', $user);
    }

    /**
     * 修改密码
     * @param Request $request phone;code;password
     * @return array status=0:成功;status=1:手机未填写;status=2:验证码未填写;status=3:验证码错误;status=4:密码未填写;
     */
    public function resetPassword(Request $request)
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
        if (!$request->password) {
            return $this->message(4, '密码未填写');
        }
        $user = Auth::user();
        User::resetPassword($user, $request->password);
        return $this->message(0);
    }

    /**
     * 忘记密码
     * @param Request $request phone;code;password
     * @return array status=0:成功;status=1:手机未填写;status=2:验证码未填写;status=3:验证码错误;status=4:密码未填写;status=5:用户不存在;
     */
    public function forgotPassword(Request $request)
    {
        if (!$request->phone) {
            return $this->message(1, '手机未填写');
        }
        $phone = $request->phone;
        $user = (new User())->where('phone', $phone)->first();
        if (!$user) {
            return $this->message(5, '用户不存在');
        }
        if (!$request->code) {
            return $this->message(2, '验证码未填写');
        }
        if (!$this->tellCode($phone, $request->code)) {
            return $this->message(3, '验证码错误');
        }
        if (!$request->password) {
            return $this->message(4, '密码未填写');
        }
        User::resetPassword($user, $request->password);
        return $this->message(0);
    }


    /**
     * @param Request $request career_id
     * @return array status=0:成功;status=1:修改失败
     */
    public function selectCareer(Request $request)
    {
        $career_id = $request->career_id;
        if (User::updateCareer($career_id)) {
            return $this->message(0);
        }
        return $this->message(1, '修改失败');
    }
}
