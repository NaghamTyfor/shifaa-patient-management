<?php

namespace App\Repositories\Eloquent;

use App\Models\Patient;
use App\Repositories\Interfaces\PatientRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PatientRepository implements PatientRepositoryInterface
{
public function getAllPaginated(int $perPage, ?string $search = null): LengthAwarePaginator
{
    $search = trim($search);
    $query = Patient::query();

    if (!empty($search)) {
        $query->where('name', 'LIKE', "%{$search}%");
    }

    return $query->orderBy('id', 'desc')->paginate($perPage);
}


    public function findById(int $id)
    {
        return Patient::findOrFail($id);
    }

    public function create(array $data)
    {
        return Patient::create($data);
    }

    public function update(int $id, array $data)
    {
        $patient = $this->findById($id);
        $patient->update($data);
        return $patient;
    }

    public function delete(int $id): bool
    {
        return Patient::destroy($id) > 0;
    }

    public function deleteMultiple(array $ids): int
    {
        return Patient::destroy($ids);
    }
}
