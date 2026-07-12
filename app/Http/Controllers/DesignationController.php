<?php

namespace App\Http\Controllers;

use App\Http\Requests\Designation\StoreDesignationRequest;
use App\Http\Requests\Designation\UpdateDesignationRequest;
use App\Models\Designation;
use App\Services\DesignationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesignationController extends Controller
{
    public function __construct(protected DesignationService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $designations = $this->service->getData($request->only(['search', 'sort', 'direction', 'per_page']));
        return Inertia::render('admin/designation/DesignationIndexPage', ['designations' => $designations]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDesignationRequest $request)
    {
        $validated = $request->validated();
        $this->service->store(name: $validated['name']);

        return redirect()->route('designations.index')->with('success', 'Designation created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDesignationRequest $request, Designation $designation)
    {
        $validated = $request->validated();
        $this->service->update(designation: $designation, name: $validated['name']);

        return redirect()->route('designations.index')->with('success', 'Designation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Designation $designation)
    {
        $this->service->destroy($designation);

        return redirect()->route('designations.index')
            ->with('success', 'Designation deleted successfully.');
    }
}
