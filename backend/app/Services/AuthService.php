<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Exceptions\ApiException;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {}

    public function login(array $credentials): array
    {
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw new ApiException('Invalid email or password', 401);
        }

        $token = $this->userRepository->createToken($user);

        return [
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ];
    }

    public function logout($user): void
    {
        $user->currentAccessToken()->delete();
    }

    public function getAuthenticatedUser($user)
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
