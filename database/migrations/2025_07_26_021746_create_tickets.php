<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_no')->unique();
            $table->string('subject');
            $table->text('description');
            $table->string('status'); // open, in-progress, closed
            $table->string('priority'); // low, medium, high
            $table->string('image')->nullable();
            $table->boolean('requires_approval')->default(false);
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            // current assigned IT Support employee
            $table->foreignId('assigned_to')->nullable()->constrained('employees')->onDelete('set null');

            // person who submitted the ticket
            $table->foreignId('submitted_by')->constrained('employees')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('ticket_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained('tickets')->onDelete('cascade');

            // to whom the ticket was assigned
            $table->foreignId('assigned_to')->constrained('employees')->onDelete('cascade');

            // who performed the assignment
            $table->foreignId('assigned_by')->constrained('employees')->onDelete('cascade');

            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
