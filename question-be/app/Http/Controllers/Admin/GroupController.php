<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Career;
use App\Model\CategoryGroup;
use App\Model\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GroupController extends BaseController
{
    protected $tree = [];

    public function list(Request $request)
    {
        if (!$request->cate_id) exit();
        $groups = CategoryGroup::select('groups.*', 'category_group.sort', 'category_group.category_id', 'category_group.career_id', 'category_group.start_time', 'category_group.expire_time', 'g1.name as pre_group_name')
            ->where('category_id', $request->cate_id)
            ->leftJoin('groups', 'groups.id', '=', 'group_id')
            ->leftJoin('groups as g1', 'groups.pre_group_id', '=', 'g1.id')
            ->orderBy('sort')
            ->get();
        $this->addCareer($groups);
        return $this->_message(0, '', $groups, count($groups));
    }

    public function create(Request $request)
    {
        //name difficulty pre_group_id pass mark sort career_id start_time expire_time
        if (!$request->cate_id) exit();
        if (!$request->name) return $this->message(1, '名称不能为空');
        $group = new Group();
        $group->name = $request->name;
        if ($request->difficulty) $group->difficulty = $request->difficulty;
        if ($request->pre_group_id) $group->pre_group_id = $request->pre_group_id;
        if ($request->pass) $group->pass = $request->pass;
        if ($request->mark) $group->mark = $request->mark;
        $group->save();
        $cate_group = new CategoryGroup();
        $cate_group->category_id = $request->cate_id;
        $cate_group->group_id = $group->id;
        if ($request->sort) $cate_group->sort = $request->sort;
        if ($request->career_id) $cate_group->career_id = $request->career_id;
        if ($request->start_time) $cate_group->start_time = $request->start_time;
        if ($request->expire_time) $cate_group->expire_time = $request->expire_time;
        $cate_group->save();
        Log::info('添加关卡', ['group' => json_decode(json_encode($group), true), 'cate_group' => json_decode(json_encode($cate_group), true)]);
        return $this->message(0);
    }

    public function update(Request $request)
    {
        if (!$request->cate_id) exit();
        if (!$request->group_id) exit();
        $group = Group::find($request->group_id);
        $cate_group = CategoryGroup::where('category_id', $request->cate_id)->where('group_id', $request->group_id)->first();
        if ($request->name) $group->name = $request->name;
        $group->difficulty = $request->difficulty;
        if ($request->pre_group_id) $group->pre_group_id = $request->pre_group_id; else $group->pre_group_id = 0;
        $group->pass = $request->pass;
        $group->mark = $request->mark;
        if ($request->sort) $cate_group->sort = $request->sort; else $cate_group->sort = 0;
        $cate_group->career_id = $request->career_id;
        $cate_group->start_time = $request->start_time;
        $cate_group->expire_time = $request->expire_time;
        $group->save();
        $cate_group->save();
        Log::info('修改关卡', ['group' => json_decode(json_encode($group), true), 'cate_group' => json_decode(json_encode($cate_group), true)]);
        return $this->message(0);
    }

    public function delete(Request $request)
    {
        if (!$request->cate_id) exit();
        if (!$request->group_id) exit();
        $group = Group::find($request->group_id);
        $group->delete();
        $cate_group = CategoryGroup::where('category_id', $request->cate_id)->where('group_id', $request->group_id)->first();
        $cate_group->delete();
        Log::info('删除关卡', ['group' => json_decode(json_encode($group), true), 'cate_group' => json_decode(json_encode($cate_group), true)]);
        return $this->message(0);
    }

    protected function addCareer($arr)
    {
        foreach ($arr as $item) {
            if ($item->career_id) {
                $id_arr = explode(',', $item->career_id);
                $careers = [];
                foreach ($id_arr as $k => $id) {
                    $career = Career::find($id);
                    $careers[] = $career;
                    if ($k != 0)
                        $item->careers_name .= ',' . $career->name;
                    else
                        $item->careers_name .= $career->name;
                }
                $item->careers = $careers;
            }
        }
    }
}
