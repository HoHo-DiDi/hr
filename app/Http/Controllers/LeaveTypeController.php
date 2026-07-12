<?php

namespace App\Http\Controllers;

use App\Exceptions\LeaveTypeSymbolUpdateBlockedException;
use App\Http\Requests\LeaveType\StoreLeaveTypeRequest;
use App\Http\Requests\LeaveType\UpdateLeaveTypeRequest;
use App\Models\LeaveType;
use App\Services\LeaveTypeService;
use Illuminate\Http\Request;

class LeaveTypeController extends Controller
{

    public function __construct(protected LeaveTypeService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $leaveTypes = $this->service->getData($request->only(['search', 'sort', 'direction', 'per_page']));

        return inertia('admin/leave-types/LeaveTypeIndexPage', compact('leaveTypes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveTypeRequest $request)
    {
        $this->service->store($request->validated());
        return to_route('leave-types.index')->with('success', 'Leave type created successfully.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaveTypeRequest $request, LeaveType $leaveType)
    {
        try {
            $this->service->update($request->validated(), $leaveType);
            return to_route('leave-types.index')->with('success', 'Leave type updated successfully.');
        } catch (LeaveTypeSymbolUpdateBlockedException $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveType $leaveType)
    {
        $this->service->destroy($leaveType);
        return to_route('leave-types.index')->with('success', 'Leave type deleted successfully.');
    }
}
