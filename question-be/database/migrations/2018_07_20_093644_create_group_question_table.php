<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupQuesionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_question', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sort')->nullable()->default(0)->comment('排序');
            $table->integer('group_id')->commnet('组id');
            $table->integer('question_id')->commnet('题目id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_question');
    }
}
