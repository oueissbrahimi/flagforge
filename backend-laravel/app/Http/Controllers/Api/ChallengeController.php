<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChallengeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Challenge::query()->orderBy('points');

        if ($request->filled('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:120',
            'category' => 'required|in:Web,Pwn,Crypto,Reverse,Forensics',
            'difficulty' => 'required|in:Easy,Medium,Hard',
            'points' => 'required|integer|min:50|max:1000',
            'description' => 'required|string',
            'flag' => 'required|string|min:6',
        ]);

        $challenge = Challenge::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'difficulty' => $validated['difficulty'],
            'points' => $validated['points'],
            'description' => $validated['description'],
            'flag_hash' => hash('sha256', trim($validated['flag'])),
        ]);

        return response()->json(['data' => $challenge], 201);
    }

    public function submitFlag(Request $request, Challenge $challenge): JsonResponse
    {
        $request->validate(['flag' => 'required|string']);

        if (!$challenge->verifyFlag($request->flag)) {
            return response()->json(['correct' => false, 'message' => 'Flag incorrect.'], 422);
        }

        DB::transaction(function () use ($challenge, $request) {
            $userId = $request->user()?->id ?? 1;
            $alreadySolved = DB::table('submissions')
                ->where('user_id', $userId)
                ->where('challenge_id', $challenge->id)
                ->where('is_correct', true)
                ->exists();

            if (!$alreadySolved) {
                DB::table('submissions')->insert([
                    'user_id' => $userId,
                    'challenge_id' => $challenge->id,
                    'is_correct' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $challenge->increment('solves_count');
            }
        });

        return response()->json([
            'correct' => true,
            'points_awarded' => $challenge->points,
            'message' => 'Flag validé ! Points crédités.',
        ]);
    }
}
