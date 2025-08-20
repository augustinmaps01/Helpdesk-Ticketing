<?php

namespace App\Http\Controllers;
use App\Models\Roles;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('management/roles',[
            'roles' => Roles::all(),
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
                'name' => 'required|string|max:255|unique:roles,name',
            ], [
                'name.required' => 'Role name is required.',
                'name.string' => 'Role name must be a valid text.',
                'name.max' => 'Role name cannot exceed 255 characters.',
                'name.unique' => 'A role with this name already exists.',
            ]);
            
            Roles::create($validated);
            return redirect()->route('roles.index')->with('success', 'Role created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create role. Please try again.');
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
    public function edit(Request $request, string $id)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roles $role)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            ], [
                'name.required' => 'Role name is required.',
                'name.string' => 'Role name must be a valid text.',
                'name.max' => 'Role name cannot exceed 255 characters.',
                'name.unique' => 'A role with this name already exists.',
            ]);
            
            $role->update($validated);
            return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update role. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Roles $role)
    {
        try {
            // Check if role has any associated users
            if ($role->users()->count() > 0) {
                return redirect()->back()->with('error', 'Cannot delete role with associated users.');
            }
            
            $role->delete();
            return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete role. Please try again.');
        }
    }
}
