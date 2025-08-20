<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditTrailController extends Controller
{
    /**
     * Display a listing of audit trails.
     */
    public function index(): Response
    {
        return Inertia::render('management/audit-trails', [
            'auditTrails' => [], // Add your audit trail data here
        ]);
    }

    /**
     * Display the specified audit trail.
     */
    public function show(string $id): Response
    {
        return Inertia::render('management/audit-trail-show', [
            'auditTrail' => [], // Add specific audit trail data here
        ]);
    }
}