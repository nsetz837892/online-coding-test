<?php

use App\Http\Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::find(2);
    $this->perPage = 15;
});

afterEach(function () {
    unset($this->user, $this->perPage);
});

describe('Expense', function () {
    describe('Success Actions', function () {
        test('can list expenses', function () {
            $response = $this->actingAs($this->user)
                ->getJson(
                    route(
                        'api.expenses.index',
                        [
                            'paginate' => 1,
                            'page'     => 1,
                            'perPage'  => $this->perPage,
                        ]
                    )
                )
                ->assertStatus(200);

            $data = $response->getData();

            expect($data->status)->toBe(200)
                ->and($data->success)->toBeTrue()
                ->and($data->meta->currentPage)->toBeInt(1)
                ->and($data->meta->perPage)->toBeInt($this->perPage)
                ->and($data->meta->total)->toBeInt(51);
        });

        test('can create expenses', function () {
            $response = $this->actingAs($this->user)
                ->postJson(route('api.expenses.store'), [
                    'name'        => 'New',
                    'userId'      => $this->user->id,
                    'categoryId'  => 1,
                    'amount'      => 99.99,
                    'date'        => now()->format('Y-m-d H:i:s'),
                    'description' => 'Test expense',
                ])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(201);
        });

        test('can delete expenses', function () {
            $response = $this->actingAs($this->user)
                ->deleteJson(route('api.expenses.destroy', ['id' => 1]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(200);
        });

        test('can view expense summary', function () {
            $response = $this->actingAs($this->user)->getJson(route('api.expenses.summary'));
            $response->assertStatus(200);
        });
    });

    describe('Fail Actions', function () {
        test('cannot create expenses invalid data', function () {
            $response = $this->actingAs($this->user)
                ->postJson(route('api.expenses.store'), [
                    'name'       => null,
                    'userId'     => null,
                    'categoryId' => 9999,
                    'amount'     => '~',
                    'date'       => now()->format('Y-m-d H:i:s'),
                ])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot create expenses missing data', function () {
            $response = $this->actingAs($this->user)
                ->postJson(route('api.expenses.store'), [])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });
    });
});