<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class AdminController extends BaseController
{
    public function pwdReset(Request $request)
    {
        if (!$oldpwd = $request->oldpwd)
            return $this->message(1, '密码未填写');
        if (!$newpwd = $request->newpwd)
            return $this->message(1, '密码未填写');
        $admin = Admin::find(session('admin_id'));
        if (!Hash::check($oldpwd, $admin->password))
            return $this->message(2, '密码不正确');
        $admin->password = Hash::make($newpwd);
        $admin->save();
        Log::info('管理员修改密码', json_decode(json_encode($admin), true));
        return $this->message(0);
    }

    public function logout()
    {
        Session::flush();
        return redirect('/admin/login');
    }
}
