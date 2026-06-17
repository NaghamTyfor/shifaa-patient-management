<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientStoreRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Http\Resources\PatientResource;
use App\Services\PatientService;
use App\Exceptions\ApiException;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function __construct(
        protected PatientService $patientService
    ) {}

    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 6);

            $search = $request->filled('search') && !in_array($request->input('search'), ['null', 'undefined'])
                ? $request->input('search')
                : null;

            $patients = $this->patientService->getAllPaginated($perPage, $search);
            return PatientResource::collection($patients);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching data'], 500);
        }
    }

    public function store(PatientStoreRequest $request)
    {
        try {
            $patient = $this->patientService->create($request->validated());
            return new PatientResource($patient);
        } catch (ApiException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the patient'], 500);
        }
    }

    public function show(int $id)
    {
        try {
            $patient = $this->patientService->findById($id);
            return new PatientResource($patient);
        } catch (ApiException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode());
        }
    }

    public function update(PatientUpdateRequest $request, int $id)
    {
        try {
            $patient = $this->patientService->update($id, $request->validated());
            return new PatientResource($patient);
        } catch (ApiException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the patient'], 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->patientService->delete($id);
            return response()->json(['message' => 'Patient deleted successfully']);
        } catch (ApiException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the patient'], 500);
        }
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:patients,id',
        ]);

        try {
            $count = $this->patientService->deleteMultiple($request->ids);
            return response()->json([
                'message' => "Successfully deleted {$count} patient(s)",
                'deleted_count' => $count,
            ]);
        } catch (ApiException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred during bulk deletion'], 500);
        }
    }
}
