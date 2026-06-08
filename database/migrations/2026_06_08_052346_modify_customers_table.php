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
         Schema::table('customers', function (Blueprint $table) {

            // Purane columns remove
            $table->dropColumn([
                'email',
                'gst_number',
                'status'
            ]);

            // Naye columns add
            $table->string('aadhaar')->nullable();
            $table->string('image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::table('customers', function (Blueprint $table) {

            $table->string('email')->nullable();
            $table->string('gst_number')->nullable();
            $table->boolean('status')->default(true);

            $table->dropColumn([
                'aadhaar',
                'image'
            ]);
        });
    }
};
