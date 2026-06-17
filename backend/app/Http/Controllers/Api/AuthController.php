<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use App\Exceptions\ApiException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function login(LoginRequest $request)
    {
        try {
            $data = $this->authService->login($request->validated());
            return response()->json($data);
        } catch (ApiException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode());
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request->user());
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred during logout'], 500);
        }
    }

    public function user(Request $request)
    {
        return response()->json(
            $this->authService->getAuthenticatedUser($request->user())
        );
    }
}
