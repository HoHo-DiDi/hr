<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaveTypeRequest;
use App\Http\Requests\UpdateLeaveTypeRequest;
use App\Models\LeaveType;
use App\Services\LeaveTypeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveTypeController extends Controller
{
    public function __construct(protected LeaveTypeService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $leaveTypes = $this->service->getData($request->only(['search', 'sort', 'direction', 'per_page']));
        return Inertia::render('admin/leave-types/LeaveTypeIndexPage', compact('leaveTypes'));
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
    public function store(StoreLeaveTypeRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->route('leave-types.index')->with('success', 'Leave type created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LeaveType $leaveType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeaveType $leaveType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaveTypeRequest $request, LeaveType $leaveType)
    {
        $this->service->update($request->validated(), $leaveType);
        return redirect()->route('leave-types.index')->with('success', 'Leave type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveType $leaveType)
    {
        $this->service->destroy($leaveType);
        return redirect()->route('leave-types.index')->with('success', 'Leave type deleted successfully.');
    }
}
