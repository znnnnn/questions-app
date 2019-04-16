<?php

namespace App\Http\Controllers;

use App\Model\Configuration;
use Illuminate\Http\Request;
use App\Lib\aliyun\SendSms;
use Predis\Client;

class ServiceController extends BaseController
{
    /**
     * 发送短信验证码
     * @param Request $request phone:手机号
     * @return array    status=1:手机号未填写;status=2:短信冷却中;status=3:发送失败;
     */
    public function sendSms(Request $request)
    {
        if (!$request->phone) {
            return $this->message(1, '手机号未填写');
        }
        $phone = $request->phone;
        $redis = new Client();
        $redis_user_many_use_name = 'nska:sms:' . $phone . ':expire';
        //冷却时间判断
        if ($redis->exists($redis_user_many_use_name)) {
            return $this->message(2, '短信冷却中');
        }
        $aliyun_accessKeyId = '';
        $aliyun_accessKeySecret = '';
        $aliyun_SignName = '';
        $aliyun_TemplateCode = '';
        $configs = Configuration::all();
        foreach ($configs as $config) {
            switch ($config->name) {
                case 'aliyun_accessKeyId':
                    $aliyun_accessKeyId = $config->content;
                    break;
                case 'aliyun_accessKeySecret':
                    $aliyun_accessKeySecret = $config->content;
                    break;
                case 'aliyun_SignName':
                    $aliyun_SignName = $config->content;
                    break;
                case 'aliyun_TemplateCode':
                    $aliyun_TemplateCode = $config->content;
                    break;
            }
        }

        $size = 6;
        $code = '';
        for ($i = 0; $i < $size; $i++) {
            $code .= mt_rand(0, 9);
        }
        //发送短信
        $sms = SendSms::sendSms(
            $phone,
            $aliyun_accessKeyId,
            $aliyun_accessKeySecret,
            $aliyun_SignName,
            $aliyun_TemplateCode,
            [
                'code' => $code,
            ]);
        if (!$sms) {
            return $this->message(3, '发送失败');
        }
        $redis_code_name = 'nska:sms:' . $phone . ':code';
        //将验证码存入redis设置过期时间
        $redis->set($redis_code_name, $code);
        $redis->expire($redis_code_name, 60 * 5);
        //防止用户疯狂发短信，设置冷却时间
        $redis->set($redis_user_many_use_name, '1');
        $redis->expire($redis_user_many_use_name, 59);

        return $this->message(0);
    }
}
