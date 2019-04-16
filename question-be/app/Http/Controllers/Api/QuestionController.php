<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Predis\Client;

class QuestionController extends BaseController
{
    /**
     * 检查一道题目的答案
     * @param Request $request group_id:组（关卡）id；sort_id:题目的sort_id；answer:用户答案，如果是多选用|分隔
     * @return string
     */
    public function checkOne(Request $request)
    {
        if (!$request->group_id) exit();
        if (!isset($request->sort_id)) exit();
        if (!$request->answer) return $this->message(0);
        $client = new Client();
        $kname = $this->redis_group_name . ':' . $request->group_id . ':' . $request->sort_id;
        //查看redis是否存在该题目
        if (!$client->exists($kname)) return $this->message(1, '找不到题目');
        $q = $client->hgetall($kname);
        $user_answer = explode('|', $request->answer);
        $answer_arr = explode('|', $q['answer']);

        $kname1 = $this->redis_user_answer_name . ':' . Auth::id() . ':' . $request->group_id;
        //判断题目正确性
        if (!(count(array_filter($user_answer)) == count(array_filter($answer_arr)))) {

            $client->hset($kname1, $request->sort_id, 0);
            $client->expire($kname1, 60 * 60 * 2);
//            $client->hdel($kname1, $request->sort_id);
            return $this->message(0);
        }
        foreach (array_filter($user_answer) as $v) {
            if (!in_array($v, $answer_arr)) {
                $client->hset($kname1, $request->sort_id, 0);
                $client->expire($kname1, 60 * 60 * 2);
//                $client->hdel($kname1, $request->sort_id);
                return $this->message(0);
            }
        }
        //存入redis表示该题已做正确，并设置过期时间
        $client->hset($kname1, $request->sort_id, 1);
        $client->expire($kname1, 60 * 60 * 2);
        return $this->message(0);
    }
}
