<?php

namespace App\Http\Controllers;


use App\Http\Requests\Allowance\StoreAllowanceRequest;
use Illuminate\Http\Request;
use App\Models\Allowance;
use App\Models\Designation;
use App\Services\AllowanceService;
use Inertia\Inertia;

class AllowanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designations = Designation::select('id', 'name')->get();

        $allowances = Allowance::with('designations:id,name')->latest()->get();

        return Inertia::render('admin/allowance/AllowancePage', ['allowances' => $allowances, 'designations' => $designations]);
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
    public function store(StoreAllowanceRequest $request, AllowanceService $allowanceService)
    {
        $validated = $request->validated();
        $allowanceService->createAllownace(
            name: $validated['name'],
            designationIds: $validated['designation_id'],
            amount: $validated['amount']
        );

        return redirect()
            ->route('allowances.index')
            ->with('success', 'Allowance created successfully.');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
