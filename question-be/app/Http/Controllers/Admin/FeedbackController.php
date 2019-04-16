<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends BaseController
{
    public function list(Request $request)
    {
        //limit page phone mindate maxdate
        $feedbacks = Feedback::select('feedbacks.*', 'users.phone')
            ->leftJoin('users', 'users.id', '=', 'user_id')
            ->where('phone', 'like', '%' . $request->phone . '%')
            ->where(function ($query) use ($request) {
                if (isset($request->mindate)) {
                    $query->where('feedbacks.created_at', '>=', $request->mindate);
                }
                if (isset($request->maxdate)) {
                    $query->where('feedbacks.created_at', '<=', $request->maxdate);
                }
            })
            ->orderBy('feedbacks.created_at', 'desc')
            ->paginate($request->limit);
        return $this->_message(0, '', $feedbacks->items(), $feedbacks->total());
    }
}
