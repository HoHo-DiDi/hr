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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('e_code')->unique();
            $table->string('phone');
            $table->string('employment_status');
            $table->string('avatar')->nullable();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('department_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('designation_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->integer('salary');
            $table->date('joined_date');
            $table->date('resigned_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
