<?php

namespace App\Http\Controllers;

use App\Http\Requests\Designation\StoreDesignationRequest;
use App\Http\Requests\Designation\UpdateDesignationRequest;
use App\Models\Designation;
use App\Services\DesignationService;
use Inertia\Inertia;

class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designations = Designation::select('id', 'name')->latest()->paginate();
        return Inertia::render('admin/designation/DesignationPage', ['designations' => $designations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDesignationRequest $request, DesignationService $designationService)
    {
        $validated = $request->validated();
        $designationService->createDesignation(name: $validated['name']);

        return redirect()->route('designations.index')->with('success', 'Designation created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Designation $designation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDesignationRequest $request, DesignationService $designationService, Designation $designation)
    {
        $validated = $request->validated();
        $designationService->updateDesignation(designation: $designation, name: $validated['name']);

        return redirect()->route('designations.index')->with('success', 'Designation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Designation $designation)
    {
        $designation->delete();

        return redirect()->route('designations.index')
            ->with('success', 'Designation deleted successfully.');
    }
}
