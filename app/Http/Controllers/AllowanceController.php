<?php

namespace App\Http\Controllers;


use App\Http\Requests\Allowance\StoreAllowanceRequest;
use App\Http\Requests\Allowance\UpdateAllowanceRequest;
use App\Models\Allowance;
use App\Models\Designation;
use App\Services\AllowanceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllowanceController extends Controller
{
    public function __construct(protected AllowanceService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $designations = Designation::select('id', 'name')->get();

        $allowances = $this->service->getAllowances($request->only(['search', 'sort', 'direction', 'per_page']));

        return Inertia::render('admin/allowance/AllowanceIndexPage', ['allowances' => $allowances, 'designations' => $designations]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAllowanceRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()
            ->route('allowances.index')
            ->with('success', 'Allowance created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAllowanceRequest $request, Allowance $allowance)
    {
        $this->service->update($request->validated(), $allowance);

        return redirect()->route('allowances.index')->with('success', 'Allowance update successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Allowance $allowance)
    {
        $this->service->destroy($allowance);

        return redirect()->route('allowances.index')
            ->with('success', 'Allowance deleted successfully.');
    }
}
