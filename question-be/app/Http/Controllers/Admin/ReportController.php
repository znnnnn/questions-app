<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Category;
use App\Model\Report;
use Illuminate\Http\Request;

class ReportController extends BaseController
{
    public function list(Request $request)
    {
        //limit page phone mindate maxdate cate_id
        $ids = [];
        if ($request->cate_id) $ids = Category::groupIds($request->cate_id);
        $reports = Report::select('reports.*', 'users.phone','groups.name as group_name')
            ->leftJoin('users', 'users.id', '=', 'user_id')
            ->leftJoin('groups','groups.id','=','group_id')
            ->where('phone', 'like', '%' . $request->phone . '%')
            ->where(function ($query) use ($request, $ids) {
                if ($ids) {
                    $query->whereIn('group_id', $ids);
                }
                if (isset($request->mindate)) {
                    $query->where('reports.created_at', '>=', $request->mindate);
                }
                if (isset($request->maxdate)) {
                    $query->where('reports.created_at', '<=', $request->maxdate);
                }
            })
            ->orderBy('reports.created_at','desc')
            ->paginate($request->limit);
        return $this->_message(0, '', $reports->items(), $reports->total());
    }
}
