<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'category', 'difficulty', 'points', 'description', 'flag_hash', 'solves_count'
    ];

    protected $hidden = ['flag_hash'];

    public function writeups()
    {
        return $this->hasMany(Writeup::class);
    }

    public function verifyFlag(string $submittedFlag): bool
    {
        return hash_equals($this->flag_hash, hash('sha256', trim($submittedFlag)));
    }
}
