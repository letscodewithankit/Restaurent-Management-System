<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bill_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sub_item_id')->unsigned();
            $table->bigInteger('bill_number_id')->unsigned();
            $table->integer('quantity');
            $table->double('amount');
            $table->integer('status');
            $table->foreign('sub_item_id')->references('id')->on('sub_item')->cascadeOnDelete();
            $table->foreign('bill_number_id')->references('id')->on('bill_number')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill_details');
    }
};
