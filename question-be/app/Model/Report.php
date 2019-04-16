<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Report extends Model
{
    protected $fillable = ['*'];

    /**
     * 根据关卡的id获取历史记录
     * @param $group_ids
     * @return mixed
     */
    public static function history($group_ids)
    {
        return self::select('reports.*', 'groups.name', 'groups.mark', 'category_group.start_time', 'category_group.expire_time')
            ->leftJoin('groups', 'groups.id', '=', 'reports.group_id')
            ->leftJoin('category_group', 'category_group.group_id', '=', 'groups.id')
            ->where('reports.user_id', Auth::id())
            ->whereIn('reports.group_id', $group_ids)
            ->orderBy('reports.created_at', 'desc')
            ->get();
    }
}
