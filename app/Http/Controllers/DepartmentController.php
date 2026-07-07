<?php

namespace App\Http\Controllers;

use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Models\Department;
use App\Services\DepartmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DepartmentController extends Controller
{

    public function __construct(protected DepartmentService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $departments = $this->service->getData($request->only(['search', 'sort', 'direction', 'per_page']));
        return Inertia::render('admin/department/DepartmentPage', ['departments' => $departments]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        $validated = $request->validated();
        $this->service->store(name: $validated['name']);

        return redirect()->route('departments.index')->with('success', 'Department created successfully.');
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $validated = $request->validated();
        $this->service->update(department: $department, name: $validated['name']);

        return redirect()->route('departments.index')->with('success', 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $this->service->destroy($department);

        return redirect()->route('departments.index')
            ->with('success', 'Department deleted successfully.');
    }
}
