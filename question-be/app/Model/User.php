<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phone', 'password', 'career_id', 'point', 'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token'
    ];

    /**
     * 修改密码
     * @param $user
     * @param $password
     */
    public static function resetPassword($user, $password)
    {
        $user->password = Hash::make($password);
        $user->save();
    }

    /**
     * 更新行业
     * @param $cid
     * @return bool
     */
    public static function updateCareer($cid)
    {
        if ($cid == 0) {
            $career = true;
        } else
            $career = (new Career())->find($cid);
        if ($career) {
            $user = Auth::user();
            $user->career_id = $cid;
            if ($user->save()) {
                return true;
            }
            return false;
        }
        return false;
    }

    public function career()
    {
        return $this->belongsTo('App\Model\Career');
    }
}
