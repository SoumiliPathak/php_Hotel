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
        Schema::table('rooms', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
            $table->integer('ratings')->nullable()->change();
            $table->integer('area')->nullable()->change();
            $table->integer('max-capacity')->nullable()->change();
            $table->renameColumn('max-capacity','max_capacity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->text('description')->nullable(false)->change();
            $table->integer('ratings')->nullable(false)->change();
            $table->integer('area')->nullable(false)->change();
            $table->integer('max-capacity')->nullable(false)->change(); 
            $table->renameColumn('max_capacity','max-capacity');  
        });
    }
};
