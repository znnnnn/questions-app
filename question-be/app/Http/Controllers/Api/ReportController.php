<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Model\Category;
use App\Model\CategoryGroup;
use App\Model\Group;
use App\Model\ReportSta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Predis\Client;
use App\Model\Report;

class ReportController extends BaseController
{
    /**
     * 提交答案并记录
     * @param $cate_id :分类id
     * @param $group_id :组（关卡）id
     * @param Request $request time:时间 格式00:00:00
     * @return string
     */
    public function submit($cate_id, $group_id, Request $request)
    {
        /** 判断是否有权限进行 */
        $cg = CategoryGroup::getOneByForeignKey($cate_id, $group_id);
        if (!$cg) exit();
        $cate = Category::find($cate_id);
        $pid = $cate->pid;
        //判断父级分类行业和时间
        if (!$pid == 0) {
            $this->judgeCateCareer($pid);
            $this->judgeCateDate($pid);
        }
        //判断该分类行业和时间
        $this->judgeCateCareer($cate_id, $cate);
        $this->judgeCateDate($cate_id, $cate);
        //判断组（关卡）行业和时间
        $this->judgeGroupCareer($cg);
        $this->judgeGroupDate($cg);

        $client = new Client();
        $rn = $this->redis_user_answer_name . ':' . Auth::id() . ':' . $group_id;
        $t_answers = $client->hgetall($rn);
        //计算成绩
        if (!$t_answers) return $this->message(1, '成绩不存在');
        $score = 0;
        foreach ($t_answers as $k => $v) {
            if ($v == '1')
                $score += (int)$client->hget($this->redis_group_name . ':' . $group_id . ':' . $k, 'score');
        }
        $score_all = 0;
        $ks = $client->keys($this->redis_group_name . ':' . $group_id . ':*');
        foreach ($ks as $k => $v) {
            $arr = $client->hgetall($this->redis_group_name . ':' . $group_id . ':' . $k);
            $score_all += $arr['score'];
        }
        $score_pro = round($score / $score_all * 100);
        //判断是否及格
        $pass = Group::find($group_id)->pass;
        if (!is_null($pass) && !empty($pass)) {
            if ($score_pro >= (int)$pass) {
                $is_pass = 1;
            } else $is_pass = 0;
        } else  $is_pass = 1;
        //保存答题数据
        $report = new Report();
        $report->user_id = Auth::id();
        $report->group_id = $group_id;
        $report->get_score = $score_pro;
        $report->take_time = $request->time;
        $report->is_pass = $is_pass;
        $report->save();
        //数据统计
        $report_sta_ = new ReportSta();
        $report_sta = $report_sta_->where('user_id', $report->user_id)->where('group_id', $report->group_id)->first();
        if ($report_sta) {
            $report_sta->time += 1;
            if ($report->get_score > $report_sta->max_get_score)
                $report_sta->max_get_score = $report->get_score;
            if ($report_sta->is_pass == '0' && $report->is_pass == '1')
                $report_sta->is_pass = '1';
            $report_sta->save();
        } else {
            $report_sta_->user_id = Auth::id();
            $report_sta_->group_id = $group_id;
            $report_sta_->time = 1;
            $report_sta_->max_get_score = $score_pro;
            $report_sta_->is_pass = $is_pass;
            $report_sta_->save();
        }
        //删除redis用户成绩数据
        $client->hdel($rn, $client->hkeys($rn));

        return $this->message(0, '提交成功', $report);
    }

    public function checkAndSubmit($cate_id, $group_id, Request $request)
    {
        /** 判断是否有权限进行 */
        $cg = CategoryGroup::getOneByForeignKey($cate_id, $group_id);
        if (!$cg) exit();
        $cate = Category::find($cate_id);
        $pid = $cate->pid;
        //判断父级分类行业和时间
        if (!$pid == 0) {
            $this->judgeCateCareer($pid);
            $this->judgeCateDate($pid);
        }
        //判断该分类行业和时间
        $this->judgeCateCareer($cate_id, $cate);
        $this->judgeCateDate($cate_id, $cate);
        //判断组（关卡）行业和时间
        $this->judgeGroupCareer($cg);
        $this->judgeGroupDate($cg);

        if (!$answers = $request->answers) return $this->message(1, '未填写答案');
        $client = new Client();
        $score = 0;
        foreach ($answers as $k => $v) {
            $kname = $this->redis_group_name . ':' . $group_id . ':' . $k;
            if (!$client->exists($kname)) continue;
            $q = $client->hgetall($kname);
            $user_answer = explode('|', $v);
            $answer_arr = explode('|', $q['answer']);

            if (!(count(array_filter($user_answer)) == count(array_filter($answer_arr)))) continue;
            foreach (array_filter($user_answer) as $v) {
                if (!in_array($v, $answer_arr)) continue 2;
            }
            $score += $q['score'];
        }
        $score_all = 0;
        $ks = $client->keys($this->redis_group_name . ':' . $group_id . ':*');
        foreach ($ks as $k => $v) {
            $arr = $client->hgetall($this->redis_group_name . ':' . $group_id . ':' . $k);
            $score_all += $arr['score'];
        }
        $score_pro = round($score / $score_all * 100);
        //判断是否及格
        $pass = Group::find($group_id)->pass;
        if (!is_null($pass) && !empty($pass)) {
            if ($score_pro >= (int)$pass) {
                $is_pass = 1;
            } else $is_pass = 0;
        } else  $is_pass = 1;
        //保存答题数据
        $report = new Report();
        $report->user_id = Auth::id();
        $report->group_id = $group_id;
        $report->get_score = $score_pro;
        $report->take_time = $request->time;
        $report->is_pass = $is_pass;
        $report->save();
        //数据统计
        $report_sta_ = new ReportSta();
        $report_sta = $report_sta_->where('user_id', $report->user_id)->where('group_id', $report->group_id)->first();
        if ($report_sta) {
            $report_sta->time += 1;
            if ($report->get_score > $report_sta->max_get_score)
                $report_sta->max_get_score = $report->get_score;
            if ($report_sta->is_pass == '0' && $report->is_pass == '1')
                $report_sta->is_pass = '1';
            $report_sta->save();
        } else {
            $report_sta_->user_id = Auth::id();
            $report_sta_->group_id = $group_id;
            $report_sta_->time = 1;
            $report_sta_->max_get_score = $score_pro;
            $report_sta_->is_pass = $is_pass;
            $report_sta_->save();
        }
        return $this->message(0, '提交成功', $report);
    }

    /**
     * 排名
     * @param null $cate_id
     * @return string
     */
    public function rank($cate_id = null)
    {
        $data = [];
        if (!$cate_id) {
            $group_ids = Category::groupIds(4);
            $data = ReportSta::allRank($group_ids);
        } else {
            $group_ids = Category::groupIds($cate_id);
            $data = ReportSta::cateRank($group_ids);
        }
        return $this->message(0, '', $data);
    }

    /**
     * 历史记录
     * @param $cate_id
     * @return string
     */
    public function history($cate_id)
    {
        $group_ids = Category::groupIds($cate_id);
        $data = [];
        if (count($group_ids))
            $data = ReportSta::history($group_ids);
        return $this->message(0, '', $data);
    }
}
