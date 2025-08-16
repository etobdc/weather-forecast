<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('previsao', function (Blueprint $table) {
            $table->string('localidade')->after('id')->default('Chapecó, SC');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('previsao', function (Blueprint $table) {
            $table->dropColumn('localidade');
        });
    }
};
