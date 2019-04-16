<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportSta extends Model
{
    protected $table = 'report_sta';
    protected $fillable = ['*'];

    /**
     * 除了行业分类的排名
     * @return array
     */
    public static function allRank($group_ids)
    {
        $rank = self::select('user_id', 'phone', DB::raw('SUM(max_get_score) as sum_score'))
            ->whereNotIn('group_id', $group_ids)
            ->groupBy('user_id')
            ->orderBy('sum_score', 'desc')
            ->leftJoin('users', 'users.id', '=', 'report_sta.user_id')
            ->get();
        self::blurryRankPhone($rank);
        $my = $rank->where('user_id', Auth::id())->first();
        if ($my) {
            $myrank = 1;
            foreach ($rank as $item) {
                if ($item->user_id != Auth::id()) {
                    $myrank += 1;
                } else break;
            }
            $my->rank = $myrank;
        } else $my = [];
        $data = [
            'rank' => $rank,
            'my' => $my,
        ];
        return $data;
    }

    /**
     * 一个分类的排名
     * @param $group_ids
     * @return array
     */
    public static function cateRank($group_ids)
    {
        $rank = self::select('user_id', 'phone', DB::raw('SUM(max_get_score) as sum_score'))
            ->whereIn('group_id', $group_ids)
            ->groupBy('user_id')
            ->orderBy('sum_score', 'desc')
            ->leftJoin('users', 'users.id', '=', 'report_sta.user_id')
            ->get();
        self::blurryRankPhone($rank);
        $my = $rank->where('user_id', Auth::id())->first();
        if ($my) {
            $myrank = 1;
            foreach ($rank as $item) {
                if ($item->user_id != Auth::id()) {
                    $myrank += 1;
                } else break;
            }
            $my->rank = $myrank;
        } else $my = [];
        $data = [
            'rank' => $rank,
            'my' => $my,
        ];
        return $data;
    }

    public static function blurryRankPhone($v)
    {
        foreach ($v as $k => $item) {
            if (!$item->phone) unset($v[$k]);
            else
                $item->phone = substr_replace($item->phone, '*******', 0, 7);
        }
    }

    public static function history($group_ids)
    {
        return self::select('report_sta.*', 'groups.name', 'groups.mark', 'category_group.start_time', 'category_group.expire_time')
            ->leftJoin('groups', 'groups.id', '=', 'report_sta.group_id')
            ->leftJoin('category_group', 'category_group.group_id', '=', 'groups.id')
            ->where('report_sta.user_id', Auth::id())
            ->whereIn('report_sta.group_id', $group_ids)
            ->orderBy('report_sta.updated_at', 'desc')
            ->get();
    }
}
