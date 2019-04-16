<?php

namespace App\Http\Controllers\Admin;

use App\Model\Feedback;
use App\Model\Report;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }

    public function main(Request $request)
    {
        $today = Carbon::today();
        $days = [];
        $user_s = [];
        $report_s = [];

        for ($i = 0; $i < 10; $i++) {
            $date = $today->subDays(1);
            $days[] = $today->format('m-d');
            $user_s[] = User::whereDate('created_at', $date)->count();
            $report_s[] = Report::whereDate('created_at', $date)->count();
        }

        $user_count = User::count();

        $report_count = Report::whereDate('created_at', Carbon::today())->count();

        $feedback_count = Feedback::whereDate('created_at', Carbon::today())->count();

        return view('admin.page.main', compact("user_count", "report_count", "feedback_count"))
            ->with(['days' => $days, 'user_s' => json_encode($user_s), 'report_s' => json_encode($report_s)]);
    }
}
