<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sort')->nullable()->default(0)->comment('排序');
            $table->string('name')->comment('名称');
            $table->string('mark')->nullable()->comment('备注');
            $table->integer('pid')->default(0)->comment('父id');
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
        Schema::dropIfExists('categories');
    }
}
