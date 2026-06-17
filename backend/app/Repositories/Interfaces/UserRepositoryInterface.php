<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{
    public function findByEmail(string $email);
    public function createToken($user, string $name = 'auth_token');
}
