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
        Schema::create('expenses', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'expenses_user_id'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->string('description')->nullable();
            $table->decimal('amount')->unsigned();
            $table->foreignId('category_id')->constrained(
                table: 'categories', indexName: 'expenses_category_id'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->dateTime('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('expenses');
        Schema::enableForeignKeyConstraints();
    }
};
