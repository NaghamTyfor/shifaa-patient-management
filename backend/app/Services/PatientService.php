<?php

namespace App\Services;

use App\Repositories\Interfaces\PatientRepositoryInterface;
use App\Exceptions\ApiException;

class PatientService
{
    public function __construct(
        protected PatientRepositoryInterface $patientRepository
    ) {}

    public function getAllPaginated(int $perPage, ?string $search = null)
    {
        return $this->patientRepository->getAllPaginated($perPage, $search);
    }

    public function findById(int $id)
    {
        try {
            return $this->patientRepository->findById($id);
        } catch (\Exception $e) {
            throw new ApiException('Patient not found', 404);
        }
    }

    public function create(array $data)
    {
        return $this->patientRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        try {
            return $this->patientRepository->update($id, $data);
        } catch (\Exception $e) {
            throw new ApiException('Patient not found', 404);
        }
    }

    public function delete(int $id): void
    {
        try {
            $deleted = $this->patientRepository->delete($id);
            if (!$deleted) {
                throw new ApiException('Patient not found', 404);
            }
        } catch (\Exception $e) {
            throw new ApiException('Patient not found', 404);
        }
    }

    public function deleteMultiple(array $ids): int
    {
        $deleted = $this->patientRepository->deleteMultiple($ids);
        if ($deleted === 0) {
            throw new ApiException('No patients found to delete', 404);
        }
        return $deleted;
    }
}
