<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends BaseController
{
    public function list(Request $request)
    {
        //limit page phone career_id mindate maxdate
        $users = (new User())
            ->select('users.*', 'careers.name as career_name')
            ->leftJoin('careers', 'careers.id', '=', 'users.career_id')
            ->where('phone', 'like', '%' . $request->phone . '%')
            ->where(function ($query) use ($request) {
                if (isset($request->career_id)) {
                    $query->where('career_id', $request->career_id);
                }
            })
            ->where(function ($query) use ($request) {
                if (isset($request->mindate)) {
                    $query->where('users.created_at', '>=', $request->mindate);
                }
                if (isset($request->maxdate)) {
                    $query->where('users.created_at', '<=', $request->maxdate);
                }
            })
            ->paginate($request->limit);
        return $this->_message(0, '', $users->items(), $users->total());
    }

    public function create(Request $request)
    {
        if (!$request->phone) exit();
        if (!$request->password) exit();
        if (User::where('phone', $request->phone)->first()) {
            return $this->message(1, '用户已存在');
        }
        $user = new User();
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        if (isset($request->career_id)) $user->career_id = $request->career_id;
        $user->api_token = (time() + (60 * 60 * 24 * $this->token_expired_time)) . '.' . str_random(64);
        $user->save();
        Log::info("添加用户", json_decode(json_encode($user), true));
        return $this->message(0);
    }

    public function update(Request $request)
    {
        if (!$request->id) exit();
        $user = (new User())->find($request->id);
        if ($request->phone != $user->phone) {
            if ($request->phone) {
                if (User::where('phone', $request->phone)->first()) {
                    return $this->message(1, '用户已存在');
                } else {
                    $user->phone = $request->phone;
                }
            }
        }
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        if (isset($request->career_id)) $user->career_id = $request->career_id;
        $user->save();
        Log::info("修改用户", json_decode(json_encode($user), true));
        return $this->message(0);
    }

    public function delete(Request $request)
    {
        if (!$request->id) exit();
        $user = (new User())->find($request->id);
        $user->delete();
        Log::info("修改用户", json_decode(json_encode($user), true));
        return $this->message(0);
    }
}
