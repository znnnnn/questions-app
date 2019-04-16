<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Category;
use App\Model\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Predis\Client;

class RedisController extends BaseController
{
    /**
     * 重置所有redis题目
     */
    public function setAll()
    {
        $this->delRedis($this->redis_group_name . ':*');
        $groups = Group::all();
        foreach ($groups as $group) {
            $questions = Group::getGroupQuestions($group->id);
            $this->setRedisQuestions($group->id, $questions);
        }
        Log::info('reids操作：生成所有题目');
    }

    /**
     * 重置对应分类下的所有redis题目
     * @param $cate_id
     */
    public function setByCate($cate_id)
    {
        $groups = Category::find($cate_id)->groups;
        foreach ($groups as $group) {
            $this->delRedis($this->redis_group_name . ':' . $group->id . ':*');
            $questions = Group::getGroupQuestions($group->id);
            $this->setRedisQuestions($group->id, $questions);
        }
        Log::info('reids操作：生成某分类题目', ['分类id' => $cate_id]);
    }

    /**
     * 重置对应组下的所有redis题目
     * @param $group_id
     */
    public function setByGroup($group_id)
    {
        $group = Group::find($group_id);
        $this->delRedis($this->redis_group_name . ':' . $group->id . ':*');
        $questions = Group::getGroupQuestions($group->id);
        $this->setRedisQuestions($group->id, $questions);
        Log::info('reids操作：生成某关卡题目', ['关卡id' => $group_id]);
    }

    /**
     * 删除对应key的redis
     * @param $key
     */
    protected function delRedis($key)
    {
        $client = new Client();
        $g = $client->keys($key);
        foreach ($g as $item) {
            $client->hdel($item, $client->hkeys($item));
        }
    }

    /**
     * 将获取的一组问题放入redis
     * @param $group_id
     * @param $questions
     */
    protected function setRedisQuestions($group_id, $questions)
    {
        $client = new Client();
        foreach ($questions as $k => $v) {
            $client->hmset($this->redis_group_name . ':' . $group_id . ':' . $k, [
                'sort_id' => $k,
                'id' => $v->id,
                'question' => $v->question,
                'selects' => $v->selects,
                'answer' => $v->answer,
                'ismany' => $v->ismany,
                'score' => $v->score,
                'difficulty' => $v->difficulty
            ]);
        }
    }
}
