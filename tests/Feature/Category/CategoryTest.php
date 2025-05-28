<?php

use App\Http\Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::find(2);
});

afterEach(function () {
    unset($this->user);
});

describe('Category', function () {
    describe('Success Actions', function () {
        test('can list categories', function () {
            $this->actingAs($this->user)
                ->getJson(route('api.categories.index'))
                ->assertStatus(200);
        });
    });
});