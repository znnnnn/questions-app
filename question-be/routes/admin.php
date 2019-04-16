<?php

Route::pattern('cate_id', '\d+');
Route::pattern('group_id', '\d+');

Route::group(['namespace' => 'admin'], function () {
    //登录页面跳转
    Route::get('/login', 'LoginController@index');
    //输出验证码
    Route::get('captcha', 'CommonController@Captcha');
    //登录
    Route::post('/login', 'LoginController@login');

//    Route::post('/getpwd', 'LoginController@getHashPsd');

    Route::group(['middleware' => 'admin.login'], function () {
        //首页
        Route::get('index', 'IndexController@index');
        Route::get('main', 'IndexController@main');
        Route::get('/', 'IndexController@index');
        Route::get('logout', 'AdminController@logout');
        //修改密码
        Route::post('password/reset', 'AdminController@pwdReset');
        /** 用户 */
        Route::group(['prefix' => 'user'], function () {
            //列表
            Route::get('list', 'UserController@list');
            //添加
            Route::post('create', 'UserController@create');
            //更新
            Route::post('update', 'UserController@update');
            //删除
            Route::post('delete', 'UserController@delete');
        });
        /** 分类 */
        Route::group(['prefix' => 'cate'], function () {
            //返回列表树
            Route::get('list', 'CateController@list');
            //添加
            Route::post('create', 'CateController@create');
            //更新
            Route::post('update', 'CateController@update');
            //删除
            Route::post('delete', 'CateController@delete');
        });
        /** 关卡 */
        Route::group(['prefix' => 'group'], function () {
            //列表
            Route::get('list', 'GroupController@list');
            //添加
            Route::post('create', 'GroupController@create');
            //更新
            Route::post('update', 'GroupController@update');
            //删除
            Route::post('delete', 'GroupController@delete');
        });
        /** 题目 */
        Route::group(['prefix' => 'question'], function () {
            //列表
            Route::get('list', 'QuestionController@list');
            //添加
            Route::post('create', 'QuestionController@create');
            //更新
            Route::post('update', 'QuestionController@update');
            //删除
            Route::post('delete', 'QuestionController@delete');
        });
        /** 生成redis */
        Route::get('setredis/all', 'RedisController@setAll');
        Route::get('setredis/cate/{cate_id}', 'RedisController@setByCate');
        Route::get('setredis/group/{group_id}', 'RedisController@setByGroup');
        /** 行业 */
        Route::group(['prefix' => 'career'], function () {
            //行业列表
            Route::get('list', 'CareerController@list');
            //创建行业
            Route::post('create', 'CareerController@create');
            //修改行业
            Route::post('update', 'CareerController@update');
            //删除行业
            Route::post('delete', 'CareerController@delete');
        });
        /** 配置 */
        Route::group(['prefix' => 'config'], function () {
            //列表
            Route::get('list', 'ConfigurationController@list');
            //更新
            Route::post('update', 'ConfigurationController@update');

        });
        /** 反馈 */
        Route::group(['prefix' => 'feedback'], function () {
            //列表
            Route::get('list', 'FeedbackController@list');
        });
        /** 所有成绩 */
        Route::group(['prefix' => 'report'], function () {
            //列表
            Route::get('list', 'ReportController@list');
        });
        /** 成绩统计 */
        Route::group(['prefix' => 'reportsta'], function () {
            //列表
            Route::get('list', 'ReportStaController@list');
        });


    });


});


Route::get('test', 'TestController@test1');
Route::get('head', function () {
    return 1;
});