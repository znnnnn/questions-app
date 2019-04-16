<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Category;
use App\Model\ReportSta;
use Illuminate\Http\Request;

class ReportStaController extends BaseController
{
    public function list(Request $request)
    {
        //limit page phone mindate maxdate minscore maxscore cate_id
        $ids = [];
        if ($request->cate_id) $ids = Category::groupIds($request->cate_id);
        $reports = ReportSta::select('report_sta.*', 'users.phone','groups.name as group_name')
            ->leftJoin('users', 'users.id', '=', 'user_id')
            ->leftJoin('groups','groups.id','=','group_id')
            ->where('phone', 'like', '%' . $request->phone . '%')
            ->where(function ($query) use ($request, $ids) {
                if ($ids) {
                    $query->whereIn('group_id', $ids);
                }
                if (isset($request->mindate)) {
                    $query->where('report_sta.updated_at', '>=', $request->mindate);
                }
                if (isset($request->maxdate)) {
                    $query->where('report_sta.updated_at', '<=', $request->maxdate);
                }
                if (isset($request->minscore)) {
                    $query->where('report_sta.max_get_score', '>=', $request->minscore);
                }
                if (isset($request->maxscore)) {
                    $query->where('report_sta.max_get_score', '<=', $request->maxscore);
                }
            })
            ->orderBy('report_sta.created_at','desc')
            ->paginate($request->limit);
        return $this->_message(0, '', $reports->items(), $reports->total());
    }
}
