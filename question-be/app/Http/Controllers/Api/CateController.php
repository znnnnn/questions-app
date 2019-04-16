<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\Category;
use App\Model\Group;
use App\Model\GroupQuestion;
use App\Model\ReportSta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CateController extends BaseController
{
    //每个组对应的组内题目数量-问题组缩减后的数组，格式：group_id => 一组中的题目总数
    protected $gq_n = [];
    //用户完成的group   group_id => 1
    protected $finsh_group = [];
    protected $grade_group = [];

    /**
     * 获取首页分类树，带题目总数、该用户所完成的关卡数和子级分类
     * @return mixed
     */
    public function getTopTree()
    {
        $this->getUserFinshGroup();
        $this->getGroupQuesionArr();
        $cates = Category::orderBy('sort')->get();
        $cates_tree = $this->topCateQuesionAndFinshNum($this->getTree($cates, 0));
        return $this->message(0, '', $cates_tree);
    }

    public function getTop()
    {
        return $this->message(0, '', Category::getTop());
    }

    /**
     * 获取分类子级
     * @param $cate_id
     * @return array
     */
    public function getSubCates($cate_id)
    {
//        $this->judgeCateCareer($cate_id);
//        $this->judgeCateDate($cate_id);
        return $this->message(0, '', Category::childs($cate_id));
    }

    /**
     * 一个分类中的关卡，带是否能答题（是否上锁）
     * @param $cate_id
     * @return array
     */
    public function getGroups($cate_id)
    {
//        $this->judgeCateCareer($cate_id);
//        $this->judgeCateDate($cate_id);
        $this->getUserFinshGroup();
        $groups = Category::getGroupsWithSort($cate_id);
        $this->isAble($groups);
        $this->gradeAndPass($groups);
        return $this->message(0, '', $groups);
    }

    /**
     * 一个大分类的所有组（关卡）
     * @param $cate_id
     * @return string
     */
    public function topCateGroups($cate_id)
    {
//        $this->judgeCateCareer($cate_id);
//        $this->judgeCateDate($cate_id);

        $groups = [];
        $group_ids = Category::childsGroupIds($cate_id);
        if (count($group_ids) != 0) {
            $groups = Group::childGroups($group_ids);
        }

        return $this->message(0, '', $groups);
    }

    /**
     * 获取$gq_n
     */
    protected function getGroupQuesionArr()
    {
        $gq = GroupQuestion::select(DB::raw('group_id, count(question_id) as n'))->groupBy('group_id')->get();
        $gq_n = [];
        foreach ($gq as $k => $v) {
            $gq_n[$v->group_id] = $v->n;
        }
        $this->gq_n = $gq_n;
    }


    /**
     * 获取$finsh_group/$grade_group/$grade_group
     */
    protected function getUserFinshGroup()
    {
        $user_gq_n = ReportSta::where('user_id', Auth::id())->get();
        $arr = [];
        $grade = [];
        foreach ($user_gq_n as $v) {
            if ($v->is_pass == '1') {
                $arr[$v->group_id] = $v->is_pass;
            }
            $grade[$v->group_id] = $v->max_get_score;
        }
        $this->finsh_group = $arr;
        $this->grade_group = $grade;
    }

    /**
     * 获取分类树，下级存放在数组内的sub变量中
     * @param $datas
     * @param $pid
     * @return array
     */
    protected function getTree($datas, $pid)
    {
        $tree = [];
        foreach ($datas as $data) {
            if ($data->pid == $pid) {
                $this->quesionAndFinshNum($data);
                $data->sub = $this->getTree($datas, $data->id);
                $tree[] = $data;
            }
        }
        return $tree;
    }

    /**
     * 为下级添加题目总数和下级题目总数,和用户完成的数量
     * @param $data
     * @return mixed
     */
    protected function quesionAndFinshNum($data)
    {
        $groups = $data->groups;
        $data->quesion_allnum = 0;
        $data->pass_num = 0;
        $data->group_allnum = count($data->groups);
        foreach ($groups as $group) {
            if (isset($this->gq_n[$group->id])) {
                $group->quesion_num = $this->gq_n[$group->id];
                $data->quesion_allnum += $this->gq_n[$group->id];
            } else $group->quesion_num = 0;
            if (isset($this->finsh_group[$group->id])) {
                $group->is_pass = $this->finsh_group[$group->id];
                $data->pass_num += 1;
            } else $group->is_pass = 0;
        }
        return $groups;
    }

    /**
     * 为顶级分类添加题目总数和用户完成的数量
     * @param $datas
     * @return mixed
     */
    protected function topCateQuesionAndFinshNum($datas)
    {
        foreach ($datas as $data) {
            foreach ($data->sub as $sub) {
                $data->quesion_allnum += $sub->quesion_allnum;
                $data->pass_num += $sub->pass_num;
                $data->group_allnum += $sub->group_allnum;
            }
        }
        return $datas;
    }

    /**
     * 是否能答题
     * @param $groups
     */
    protected function isAble($groups)
    {
        foreach ($groups as $group) {
            if ($group->pre_group_id != 0 && $group->pre_group_id != null) {
                if (isset($this->finsh_group[$group->pre_group_id])) {
                    $group->able = 1;
                } else $group->able = 0;
            } else $group->able = 1;
        }
    }

    protected function gradeAndPass($groups)
    {
        foreach ($groups as $group) {
            if (isset($this->grade_group[$group->id])) {
                $group->grade = $this->grade_group[$group->id];
            } else $group->grade = null;
            if (isset($this->finsh_group[$group->id])) {
                $group->ispass = $this->finsh_group[$group->id];
            } else $group->ispass = 0;
        }
    }

}
