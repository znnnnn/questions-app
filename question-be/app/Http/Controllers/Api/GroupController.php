<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\Category;
use App\Model\CategoryGroup;
use App\Model\Group;
use Illuminate\Http\Request;
use Predis\Client;

class GroupController extends BaseController
{
    /**
     * 获取一个组（关卡）的题目
     * @param $cate_id
     * @param $group_id
     * @return string
     */
    public function questions($cate_id, $group_id)
    {
        $cg = CategoryGroup::getOneByForeignKey($cate_id, $group_id);
        if (!$cg) exit();
        $cate = Category::find($cate_id);
        $pid = $cate->pid;
        //判断父级分类行业和时间
        if (!$pid == 0) {
            $this->judgeCateCareer($pid);
            $this->judgeCateDate($pid);
        }
        //判断该分类行业和时间
        $this->judgeCateCareer($cate_id, $cate);
        $this->judgeCateDate($cate_id, $cate);
        //判断组（关卡）行业和时间
        $this->judgeGroupCareer($cg);
        $this->judgeGroupDate($cg);

        $questions = $this->redisQuesions($group_id);
        if ($questions) {
            return $this->message(0, '', $questions);
        } else {
            $questions = Group::getGroupQuestions($group_id);
            if ($questions) {
                $this->setRedisQuestions($group_id, $questions);
                $this->dealQestions($questions);
                return $this->message(0, '', $questions);
            } else return $this->message(1, '关卡不存在');
        }
    }

    /**
     * 判断redis中是否存在该组（关卡）的题目
     * @param $group_id
     * @return array|bool
     */
    protected function redisQuesions($group_id)
    {
        $client = new Client();
        $ks = $client->keys($this->redis_group_name . ':' . $group_id . ':*');
        if (!$ks) {
            return false;
        }
        $data = [];
        foreach ($ks as $k => $v) {
            $arr = $client->hgetall($this->redis_group_name . ':' . $group_id . ':' . $k);
            $arr['selects'] = explode('|', $arr['selects']);
            unset($arr['answer']);
            $data[] = $arr;
        }
        return $data;
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

    /**
     * 格式化选项方便输出，删除题目中的答案变量,加上排序
     * @param $questions
     */
    protected function dealQestions($questions)
    {
        foreach ($questions as $k => $question) {
            $question['sort_id'] = $k;
            $question['selects'] = explode('|', $question['selects']);
            unset($question['answer']);
            unset($question['pivot']);
        }
    }
}
