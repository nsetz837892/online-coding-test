<?php

use App\Http\Domain\User\Models\User;
use Database\Seeders\TestDatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::find(2);
});

afterEach(function () {
    unset($this->user);
});

describe('Auth', function () {
    test('auth login api is accessible', function () {
        $response = $this->get(route('auth.login'));

        $response->assertStatus(200);
    });

    test('users can authenticate', function () {
        $this->post(route('auth.login'), [
            'username' => $this->user->username,
            'password' => TestDatabaseSeeder::USER['password'],
        ]);

        $this->assertAuthenticated();
    });

    test('users cannot authenticate with invalid password', function () {
        $this->post(route('auth.login'), [
            'username' => $this->user->username,
            'password' => 'invalid-password',
        ]);

        $this->assertGuest();
    });

    test('users cannot authenticate with invalid credentials', function () {
        $this->post(route('auth.login'), [null]);

        $this->assertGuest();
    });

    test('users can logout', function () {
        $this->actingAs($this->user)->get(route('auth.logout'));

        $this->assertGuest();
    });
});