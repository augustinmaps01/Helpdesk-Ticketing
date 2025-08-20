<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Hardware Issues',
                'description' => 'Problems with computer hardware, servers, workstations, peripherals, and physical equipment malfunctions'
            ],
            [
                'name' => 'Software Problems',
                'description' => 'Application errors, software crashes, installation issues, licensing problems, and software compatibility'
            ],
            [
                'name' => 'Network/Internet',
                'description' => 'WiFi connectivity, internet access, network configuration, VPN issues, and network performance problems'
            ],
            [
                'name' => 'Account/Access',
                'description' => 'User account issues, password resets, permission problems, login difficulties, and access control'
            ],
            [
                'name' => 'Mobile/Phone',
                'description' => 'Mobile device setup, smartphone issues, tablet problems, mobile app support, and device synchronization'
            ],
            [
                'name' => 'Printer/Scanner',
                'description' => 'Printer connectivity, print quality issues, scanner problems, driver installations, and print queue management'
            ],
            [
                'name' => 'Email Issues',
                'description' => 'Email configuration, delivery problems, spam filtering, Outlook/email client issues, and email security'
            ],
            [
                'name' => 'Other',
                'description' => 'General IT support requests, miscellaneous technical issues, and problems not covered by other categories'
            ]
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}
