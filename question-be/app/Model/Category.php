<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $fillable = ['*'];

    public function groups()
    {
        return $this->belongsToMany('App\Model\Group');
    }

    public function groupsWithSort()
    {
        return $this->belongsToMany('App\Model\Group')->withPivot('sort', 'career_id', 'start_time', 'expire_time');
    }

    public static function childs($pid)
    {
        return self::where('pid', $pid)->orderBy('sort')->get();
    }

    public static function getGroupsWithSort($cate_id)
    {
        return self::find($cate_id)->groupsWithSort()->orderBy('sort')->get();
    }

    public static function getTop()
    {
        return self::where('pid', 0)->orderBy('sort')->get();
    }

    /**
     * 获取子级分类的所有组id（关卡id）
     * @param $cate_id
     * @return array
     */
    public static function childsGroupIds($cate_id)
    {
        $id_arr = [];
        $cates = self::childs($cate_id);
        if (count($cates)) {
            foreach ($cates as $v) {
                $groups = $v->groups;
                if (count($groups)) {
                    foreach ($groups as $g) {
                        $id_arr[] = $g->id;
                    }
                }
            }
        }
        return $id_arr;
    }

    /**
     * 获取该分类和子分类下的所有组id（关卡id）
     * @param $cate_id
     * @return array
     */
    public static function groupIds($cate_id)
    {
        $id_arr = [];
        $groups = self::find($cate_id)->groups;
        if (count($groups)) {
            foreach ($groups as $v) {
                $id_arr[] = $v->id;
            }
        }
        $cates = self::childs($cate_id);
        if (count($cates)) {
            foreach ($cates as $v) {
                $groups = $v->groups;
                if (count($groups)) {
                    foreach ($groups as $g) {
                        $id_arr[] = $g->id;
                    }
                }
            }
        }
        return $id_arr;
    }


}
