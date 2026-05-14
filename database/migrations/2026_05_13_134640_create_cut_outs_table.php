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
        Schema::create('cut_outs', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->decimal('amount', 12, 2);
            $table->boolean('is_for_all')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cut_outs');
    }
};
