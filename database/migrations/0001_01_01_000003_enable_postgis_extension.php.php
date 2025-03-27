<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB; // Import DB facade

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Use raw DB statement to create the extension if it doesn't exist
        DB::statement('CREATE EXTENSION IF NOT EXISTS postgis;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optional: Drop the extension if you roll back (use with caution)
        // DB::statement('DROP EXTENSION IF EXISTS postgis;');
    }
};
