<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Career;
use App\Model\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CateController extends BaseController
{
    protected $tree = [];
    protected $name_pre = ' ┃﹄ ';

    /**
     * 返回分类列表，树格式
     * @param Request $request
     * @return array
     */
    public function list(Request $request)
    {
        $cates = Category::orderBy('sort')->get();
        $this->addCareer($cates);
        $this->cateTree($cates);
        return $this->_message(0, '', $this->tree, count($this->tree));
    }

    public function create(Request $request)
    {
        //name sort mark pid career_id start_time expire_time
        if (!$request->name) return $this->message(1, '名称不能为空');
        $cate = new Category();
        $cate->name = $request->name;
        if ($request->sort) $cate->sort = $request->sort;
        if ($request->mark) $cate->mark = $request->mark;
        if ($request->pid) $cate->pid = $request->pid;
        if ($request->career_id) $cate->career_id = $request->career_id;
        if ($request->start_time) $cate->start_time = $request->start_time;
        if ($request->expire_time) $cate->expire_time = $request->expire_time;
        if ($cate->save()) {
            Log::info('添加分类', json_decode(json_encode($cate), true));
            return $this->message(0);
        } else {
            Log::info('添加分类失败');
            return $this->message(2, '添加失败');
        }
    }

    public function update(Request $request)
    {
        if (!$request->id) exit();
        $cate = Category::find($request->id);
        if (!$cate) return $this->message(1, '未找到分类');
        $cate->name = $request->name;
        if ($request->sort) $cate->sort = $request->sort; else $cate->sort = 0;
        $cate->mark = $request->mark;
        if ($request->pid) $cate->pid = $request->pid; else $cate->pid = 0;
        $cate->career_id = $request->career_id;
        $cate->start_time = $request->start_time;
        $cate->expire_time = $request->expire_time;
        if ($cate->save()) {
            Log::info('修改分类', json_decode(json_encode($cate), true));
            return $this->message(0);
        } else {
            Log::info('修改分类失败');
            return $this->message(2, '修改失败');
        }
    }

    public function delete(Request $request)
    {
        if (!$request->id) exit();
        $cate = Category::find($request->id);
        if ($cate) $cate->delete();
        else return $this->message(1, '分类不存在');
        Log::info('删除分类', json_decode(json_encode($cate), true));
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
                    if ($career) {
                        $careers[] = $career;
                        if ($k != 0)
                            $item->careers_name .= ',' . $career->name;
                        else
                            $item->careers_name .= $career->name;
                    }
                }
                $item->careers = $careers;
            }
        }
    }

    /**
     * 分类树
     * @param $cates
     * @param int $pid
     */
    protected function cateTree($cates, $pid = 0)
    {
        foreach ($cates as $cate) {
            if ($cate->pid == $pid) {
                if ($pid != 0)
                    $cate->nick = $this->name_pre . $cate->name;
                else
                    $cate->nick = $cate->name;
                $this->tree[] = $cate;
                $this->cateTree($cates, $cate->id);
            }
        }
    }
}
