<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
/** 全局约定 */
Route::pattern('id', '\d+');
Route::pattern('career_id', '\d+');
Route::pattern('cate_id', '\d+');
Route::pattern('group_id', '\d+');

//跨域
Route::group(['middleware' => 'crosshttp'], function () {
    Route::get('test', 'TestController@test');
    //发送短信验证码
    Route::post('sendsms', 'ServiceController@sendSms');
    //注册
    Route::post('register', 'Auth\RegisterController@register');
    //账号密码登录
    Route::post('login', 'Auth\LoginController@login');
    //快捷登录注册（直接手机号+验证码：若有该账号就登录，无就注册登录）
    Route::post('fastlogin','Auth\MyLoginController@fastLogin');
    //验证码登录
    Route::post('login/sms', 'Api\LoginController@loginSms');
    //忘记密码
    Route::post('user/forgotpassword', 'Api\UserController@forgotPassword');

    //验证api_token
    Route::group(['middleware' => 'auth:api'], function () {
        //验证token是否过期
        Route::group(['middleware' => 'tokenexpire'], function () {

            Route::group(['namespace' => 'Api'], function () {

                /** user */
                Route::group(['prefix' => 'user'], function () {
                    //用户信息，带行业
                    Route::get('info', 'UserController@info');
                    //修改密码
                    Route::post('resetpassword', 'UserController@resetPassword');
                    //选择行业
                    Route::post('selectcareer', 'UserController@selectCareer');
                });
                //获取分类，并排列
                Route::get('index/cate', 'CateController@getTopTree');
                /** 分类 */
                Route::group(['prefix' => 'cate'], function () {
                    //获取顶级分类
                    Route::get('gettop', 'CateController@getTop');
                    //获取一个分类的子级
                    Route::get('{cate_id}/childs', 'CateController@getSubCates');
                    //一个分类中的关卡，带是否能答题（是否上锁）
                    Route::get('{cate_id}/groups', 'CateController@getGroups');
                    //一个大分类的所有组（关卡）
                    Route::get('{cate_id}/allgroups', 'CateController@topCateGroups');
                });

                //获取一个组（关卡）的题目
                Route::get('{cate_id}/{group_id}/questions', 'GroupController@questions');

                /** group 组、关卡 */
                Route::group(['prefix' => 'group'], function () {
                });

                /** question */
                Route::group(['prefix' => 'question'], function () {
                    //检查一道题目的答案
                    Route::post('submitone', 'QuestionController@checkOne');
                });

                /** report 成绩统计 */
                Route::group(['prefix' => 'report'], function () {
                    //提交答案，统计成绩
                    Route::get('{cate_id}/submit/{group_id}', 'ReportController@submit');
                    //提交并检查答案，后统计成绩
                    Route::post('{cate_id}/checkandsubmit/{group_id}', 'ReportController@checkAndSubmit');
                    //排名
                Route::get('rank/{cate_id?}', 'ReportController@rank');
                    //个人中心历史记录
                    Route::get('history/{cate_id}', 'ReportController@history');
                });

                /** 行业 */
                Route::group(['prefix' => 'career'], function () {
                    //所有行业列表
                    Route::get('list', 'CareerController@list');
                });

                /** feedback 意见反馈 */
                Route::group(['prefix' => 'feedback'], function () {
                    //创建意见反馈
                    Route::post('create', 'FeedbackController@create');
                });
            });
        });
    });
});