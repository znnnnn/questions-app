<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryGroup extends Model
{
    use SoftDeletes;
    protected $fillable = ['*'];
    protected $table = 'category_group';

    public static function getOneByForeignKey($cate_id, $group_id)
    {
        return self::where('category_id', $cate_id)->where('group_id', $group_id)->first();
    }


}
