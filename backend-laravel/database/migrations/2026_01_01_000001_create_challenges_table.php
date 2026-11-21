<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('challenges', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('category', ['Web', 'Pwn', 'Crypto', 'Reverse', 'Forensics']);
            $table->enum('difficulty', ['Easy', 'Medium', 'Hard']);
            $table->unsignedInteger('points')->default(100);
            $table->text('description');
            $table->string('flag_hash');
            $table->unsignedInteger('solves_count')->default(0);
            $table->timestamps();
        });

        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('challenge_id')->constrained()->cascadeOnDelete();
            $table->boolean('is_correct')->default(false);
            $table->timestamps();
            $table->unique(['user_id', 'challenge_id', 'is_correct']);
        });

        Schema::create('writeups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->longText('markdown_body');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('writeups');
        Schema::dropIfExists('submissions');
        Schema::dropIfExists('challenges');
    }
};
