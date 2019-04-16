<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Group extends Model
{
    use SoftDeletes;
    protected $fillable = ['*'];

    public function questions()
    {
        return $this->belongsToMany('App\Model\Question')->withPivot('sort');
    }

    /**
     * 获取一组的题目并排序
     * @param $group_id
     * @return bool
     */
    public static function getGroupQuestions($group_id)
    {
        $group = self::find($group_id);
        if ($group) {
            return $group->questions()->orderBy('sort')->get();
        } else return false;
    }

    public static function childGroups($group_ids)
    {
        $groups = self::select('groups.*', 'category_group.start_time', 'category_group.expire_time', 'categories.id as cate_id', 'categories.name as cate_name')
            ->leftJoin('category_group', 'category_group.group_id', '=', 'groups.id')
            ->leftJoin('categories', 'categories.id', '=', 'category_group.category_id')
            ->whereIn('groups.id', $group_ids)
            ->orderBy('category_group.updated_at', 'desc')
            ->get();

        return $groups;

    }
}
