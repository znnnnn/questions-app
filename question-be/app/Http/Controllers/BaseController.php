<?php

namespace App\Http\Controllers;

use App\Model\Category;
use App\Model\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Predis\Client;

class BaseController extends Controller
{
    //token过期时间（天）
    protected $token_expired_time = 7;

    protected $redis_group_name = 'nska:groups';
    protected $redis_user_answer_name = 'nska:answer';

    public function message($status, $message = '', $data = '')
    {
        $msg = [
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ];
        return json_encode($msg);
    }

    public function _message($status, $message = '', $data = '', $count = null)
    {
        $msg = [
            'code' => $status,
            'msg' => $message,
            'data' => $data,
            'count' => $count,
        ];
        return $msg;
    }

    /**
     * 判断验证码是否正确
     * @param $phone :手机号
     * @param $code :验证码
     * @return bool
     */
    public function tellCode($phone, $code)
    {
        $redis_code_name = 'nska:sms:' . $phone . ':code';
        $redis = new Client();
        if (!$redis->exists($redis_code_name)) {
            return false;
        }
        if (!($code == $redis->get($redis_code_name))) {
            return false;
        }
        $redis->del([$redis_code_name]);
        return true;
    }

    /**
     * 更新用户api_token
     * @param $user
     * @return mixed
     */
    protected function updateApiToken($user)
    {
        $user->api_token = (time() + (60 * 60 * 24 * $this->token_expired_time)) . '.' . str_random(64);
        $user->save();
        return $user;
    }

    /**
     * 判断用户行业是否对应分类设置行业
     * @param $cate_id
     * @param null $cate
     */
    public function judgeCateCareer($cate_id, $cate = null)
    {
        if (!isset($cate)) {
            $career_id = Category::find($cate_id)->career_id;
        } else $career_id = $cate->career_id;
        if (!is_null($career_id) && !empty($career_id)) {
            $user = Auth::user();
            $career_arr = explode(',', $career_id);
            if (!in_array($user->career_id, $career_arr)) {
                exit($this->message(21, '该身份未允许参加'));
            }
        }
    }

    /**
     * 判断分类的开始时间和结束时间
     * @param $cate_id
     * @param null $cate
     */
    public function judgeCateDate($cate_id, $cate = null)
    {
        if (!isset($cate)) {
            $cate = Category::find($cate_id);
        }
        $data = Carbon::now();
        if ($cate->start_time) {
            if ($data->lt($cate->start_time)) {
                exit($this->message(31, '未开始'));
            }
        }
        if ($cate->expire_time) {
            if ($data->gt($cate->expire_time)) {
                exit($this->message(32, '已结束'));
            }
        }
    }

    /**
     * 判断用户行业是否对应组（关卡）设置行业
     * @param $cg :category_group
     */
    public function judgeGroupCareer($cg)
    {
        $career_id = $cg->career_id;
        if (!is_null($career_id) && !empty($career_id)) {
            $user = Auth::user();
            $career_arr = explode(',', $career_id);
            if (!in_array($user->career_id, $career_arr)) {
                exit($this->message(22, '该身份未允许参加'));
            }
        }
    }

    /**
     * 判断组（关卡）的开始时间和结束时间
     * @param $cg :category_group
     */
    public function judgeGroupDate($cg)
    {
        $data = Carbon::now();
        if ($cg->start_time) {
            if ($data->lt($cg->start_time)) {
                exit($this->message(33, '未开始'));
            }
        }
        if ($cg->expire_time) {
            if ($data->gt($cg->expire_time)) {
                exit($this->message(34, '已结束'));
            }
        }
    }
}
