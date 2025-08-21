<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use Inertia\Inertia;
class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('management/departments',[
            'departments' => Department::all(),
        ]);
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
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:departments,name',
            ], [
                'name.required' => 'Department name is required.',
                'name.string' => 'Department name must be a valid text.',
                'name.max' => 'Department name cannot exceed 255 characters.',
                'name.unique' => 'A department with this name already exists.',
            ]);
            
            Department::create($validated);
            return redirect()->route('departments.index')->with('success', 'Department created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create department. Please try again.');
        }
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
    public function update(Request $request, Department $department)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:departments,name,' . $department->id,
            ], [
                'name.required' => 'Department name is required.',
                'name.string' => 'Department name must be a valid text.',
                'name.max' => 'Department name cannot exceed 255 characters.',
                'name.unique' => 'A department with this name already exists.',
            ]);
            
            $department->update($validated);
            return redirect()->route('departments.index')->with('success', 'Department updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update department. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        try {
            // Check if department has any associated employees
            if ($department->employees()->count() > 0) {
                return redirect()->back()->with('error', 'Cannot delete department with associated employees.');
            }
            
            // Note: Not checking tickets as the relationship doesn't exist in the current schema
            
            $department->delete();
            return redirect()->route('departments.index')->with('success', 'Department deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete department. Please try again.');
        }
    }
}
