<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('tickets')
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'tickets_count' => $category->tickets_count,
                    'created_at' => $category->created_at,
                    'updated_at' => $category->updated_at,
                ];
            });

        return Inertia::render('management/categories', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('management/categories', [
            'categories' => Category::all(),
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name',
                'description' => 'nullable|string|max:500',
            ], [
                'name.required' => 'Category name is required.',
                'name.string' => 'Category name must be a valid text.',
                'name.max' => 'Category name cannot exceed 255 characters',
                'name.unique' => 'This category name already exists.',
                'description.max' => 'Description cannot exceed 500 characters',
            ]);
            
            Category::create($validated);
            return redirect()->route('categories.index')->with('success', 'Category created successfully!');
        } catch(\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create category. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Inertia::render('management/category-details', [
            'category' => $category->load('tickets'),
            'relatedTickets' => $category->tickets()->with('user')->latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('management/categories', [
            'categories' => Category::all(),
            'editingCategory' => $category,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
                'description' => 'nullable|string|max:500',
            ], [
                'name.required' => 'Category name is required',
                'name.string' => 'Category name must be a valid text',
                'name.max' => 'Category name cannot exceed 255 characters',
                'name.unique' => 'This category name already exists.',
                'description.max' => 'Description cannot exceed 500 characters',
            ]);
            
            $category->update($validated);
            return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update category. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            // Check if category has associated tickets
            if ($category->tickets()->count() > 0) {
                return redirect()->back()->with('error', 'Cannot delete category that has associated tickets. Please reassign or delete the tickets first.');
            }
            
            $category->delete();
            return redirect()->route('categories.index')->with('success', 'Category deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete category. Please try again.');
        }
    }
}
