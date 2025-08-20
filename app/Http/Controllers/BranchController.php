<?php

namespace App\Http\Controllers;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;
class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('management/branches', [
                'branches' => Branch::all()
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
        Branch::create($request->validate([
            'branch_name' => 'required|string',
            'brak' => 'required|string',
            'brcode' => 'required|string',
        ]));

        return redirect()->route('branches.index')
            ->with('success', 'Branch successfully added.');
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
    public function update(Request $request, Branch $branch)
    {
        $branch->update($request->validate([
            'branch_name' => 'required|string',
            'brak' => 'required|string',
            'brcode' => 'required|string',
        ]));

        return redirect()->route('branches.index')
            ->with('success', 'Branch successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return redirect()->route('branches.index')
            ->with('success', 'Branch successfully deleted.');
    }
}
