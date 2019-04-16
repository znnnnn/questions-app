<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

class FeedbackController extends BaseController
{
    /**
     * 创建意见反馈
     * @param Request $request content:内容;img[]:图片数组;comms:联系方式（选填）
     * @return string
     */
    public function create(Request $request)
    {
        if (!$request->input('content')) return $this->message(1, '内容不能为空');
//        $imgs = $request->file('img');
        $feedback = new Feedback();
//
//        $p = Image::make($request->file('img'));
//        $path = 'uploads/feedback/' . date('Ymd');
//        if (!is_dir($path)) {
//            mkdir($path, true, 0777);
//        }
//        $name = $path . '/' . time() . '.jpg';
//        $p->save($name);
//        $feedback->img1 = $name;

        if ($imgs = $request->file('img')) {
            if (count($imgs) > 4) return $this->message(2, '图片过多');
            $ps = [];
            foreach ($imgs as $img) {
                $p = Image::make($img);
                if (($p->filesize() / (1024 * 1024)) > 4) {
                    return $this->message(3, '图片大小太大');
                }
                $ps[] = $p;
            }
            $path = 'uploads/feedback/' . date('Ymd');
            if (!is_dir($path)) {
                mkdir($path, true, 0777);
            }
            foreach ($ps as $k => $v) {
                if ($k > 3) break;
                $name = $path . '/' . time() . '-' . ($k + 1) . '.jpg';
                $v->save($name);
                $feedback['img' . ($k + 1)] = $name;
            }
        }
        $feedback->user_id = Auth::id();
        $feedback->content = $request->input('content');
        $feedback->comms = $request->comms;
        $feedback->save();
        return $this->message(0);
    }
}
