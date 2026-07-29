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
            
            $table->string('guarantor_name')->nullable()->after('image');
            $table->string('guarantor_phone', 15)->nullable()->after('guarantor_name');
            $table->text('guarantor_address')->nullable()->after('guarantor_phone');
            $table->string('guarantor_relation')->nullable()->after('guarantor_address');
       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn([
                'guarantor_name',
                'guarantor_phone',
                'guarantor_address',
                'guarantor_relation',
            ]);
        });
    }
};
