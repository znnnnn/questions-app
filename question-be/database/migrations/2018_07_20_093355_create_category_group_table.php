<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_group', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sort')->default(0)->nullable()->comment('排序');
            $table->integer('category_id')->comment('类别id');
            $table->integer('group_id')->comment('组id');
            $table->string('career_id')->nullable()->comment('行业id');
            $table->timestamp('start_time')->nullable()->commet('开始时间');
            $table->timestamp('expire_time')->nullable()->comment('过期时间');
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
        Schema::dropIfExists('category_group');
    }
}
