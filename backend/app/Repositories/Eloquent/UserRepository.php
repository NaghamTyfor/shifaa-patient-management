<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public function createToken($user, string $name = 'auth_token')
    {
        return $user->createToken($name)->plainTextToken;
    }
}
