<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Model\GroupQuestion;
use App\Model\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class QuestionController extends BaseController
{
    public function list(Request $request)
    {
        if (!$request->group_id) exit();
        $questions = GroupQuestion::select('questions.*', 'sort')
            ->where('group_id', $request->group_id)
            ->leftJoin('questions', 'questions.id', '=', 'question_id')
            ->orderBy('sort')
            ->get();
        foreach ($questions as $question) {
            $question->select_arr = explode('|', $question->selects);
            $question->answer_arr = explode('|', $question->answer);
        }
        return $this->_message(0, '', $questions, count($questions));
    }

    public function create(Request $request)
    {
        //group_id question selects answer ismany score difficulty sort
        if (!$request->group_id) exit();
        $question = new Question();
        if (!$request->question) return $this->message(1, '题目不能为空');
        if (!$request->selects) return $this->message(2, '选项不能为空');
        if (!$request->answer) return $this->message(3, '答案不能为空');
        $question->question = $request->question;
        $question->selects = $request->selects;
        $question->answer = $request->answer;
        if ($request->ismany) $question->ismany = $request->ismany;
        if ($request->score) $question->score = $request->score;
        if ($request->difficulty) $question->difficulty = $request->difficulty;
        $question->save();
        $group_question = new GroupQuestion();
        $group_question->group_id = $request->group_id;
        $group_question->question_id = $question->id;
        if ($request->sort) $group_question->sort = $request->sort;
        $group_question->save();
        Log::info('添加题目', ['question' => json_decode(json_encode($question), true), 'group_question' => json_decode(json_encode($group_question), true)]);
        return $this->message(0);
    }

    public function update(Request $request)
    {
        //group_id question_id question selects answer ismany score difficulty sort
        if (!$request->group_id) exit();
        if (!$request->question_id) exit();
        $question = Question::find($request->question_id);
        $group_question = GroupQuestion::where('group_id', $request->group_id)->where('question_id', $request->question_id)->first();
        if ($request->question) $question->question = $request->question;
        if ($request->selects) $question->selects = $request->selects;
        if ($request->answer) $question->answer = $request->answer;
        if ($request->ismany) $question->ismany = $request->ismany; else $question->ismany = 0;
        if ($request->score) $question->score = $request->score; else $question->score = 10;
        if ($request->difficulty) $question->difficulty = $request->difficulty;
        $question->save();
        if ($request->sort) $group_question->sort = $request->sort; else $group_question->sort = 0;
        $group_question->save();
        Log::info('修改题目', ['question' => json_decode(json_encode($question), true), 'group_question' => json_decode(json_encode($group_question), true)]);
        return $this->message(0);
    }

    public function delete(Request $request)
    {
        if (!$request->group_id) exit();
        if (!$request->question_id) exit();
        $question = Question::find($request->question_id);
        $question->delete();
        $group_question = GroupQuestion::where('group_id', $request->group_id)->where('question_id', $request->question_id)->first();
        $group_question->delete();
        Log::info('删除题目', ['question' => json_decode(json_encode($question), true), 'group_question' => json_decode(json_encode($group_question), true)]);
        return $this->message(0);
    }
}
