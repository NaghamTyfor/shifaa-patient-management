<?php

namespace App\Repositories\Interfaces;

use Illuminate\Pagination\LengthAwarePaginator;

interface PatientRepositoryInterface
{
    public function getAllPaginated(int $perPage, ?string $search = null): LengthAwarePaginator;
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id): bool;
    public function deleteMultiple(array $ids): int;
}
