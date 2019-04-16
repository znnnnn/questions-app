<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CareerController extends BaseController
{
    /**
     * 选项，包含公民
     * @return string
     */
    public function option()
    {
        $base = [['id' => 0, 'name' => '公民']];
        $list = Career::all();
        foreach ($list as $v) {
            $base[] = $v;
        }
        return $this->message(0, '', $base);
    }

    /**
     * 列表
     * @return string
     */
    public function list()
    {
        $careers = Career::all();
        return $this->_message(0, '', $careers, count($careers));
    }

    /**
     * 创建
     * @param Request $request name;mark
     * @return string
     */
    public function create(Request $request)
    {
        if (!$request->name) return $this->message(1, '名称不能为空');
        $career = new Career();
        $career->name = $request->name;
        $career->mark = $request->mark;
        if ($career->save()) {
            Log::info('添加行业', json_decode(json_encode($career), true));
            return $this->message(0);
        } else {
            Log::info('添加行业失败');
            return $this->message(2, '添加失败');
        }
    }

    /**
     * 更新
     * @param Request $request id;name;mark
     * @return bool|string
     */
    public function update(Request $request)
    {
        if (!$request->id) exit();
        $career = (new Career())->find($request->id);
        if (!$request->name) return $this->message(1, '名称不能为空');
        $career->name = $request->name;
        $career->mark = $request->mark;
        if ($career->save()) {
            Log::info('修改行业', json_decode(json_encode($career), true));
            return $this->message(0);
        } else {
            Log::info('修改行业失败');
            return $this->message(2, '修改失败');
        }
    }

    /**
     * 删除
     * @param Request $request
     * @return bool|string
     */
    public function delete(Request $request)
    {
        if (!$request->id) exit();
        $career = Career::find($request->id);
        if ($career->delete()) {
            Log::info('删除行业', json_decode(json_encode($career), true));
            return $this->message(0);
        } else return $this->message(1);
    }
}
