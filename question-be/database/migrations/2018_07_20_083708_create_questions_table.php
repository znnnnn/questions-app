<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuesionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('question')->comment('问题');
            $table->string('selects', 500)->comment('选项');
            $table->string('answer')->comment('答案');
            $table->tinyInteger('ismany')->default(0)->nullable()->comment('是否多选');
            $table->integer('score')->nullable()->comment('分值')->default(10);
            $table->tinyInteger('difficulty')->nullable()->comment('难度');
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
        Schema::dropIfExists('questions');
    }
}
