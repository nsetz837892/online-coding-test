<?php

use App\Http\Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

/**
 * The API returns a response in the format:
 *
 * {
 *     "success" => <boolean>,
 *     "status": <number>,
 *     "message": <string>,
 *     "data": <mixed>,
 * }
 */

describe('User', function () {
    describe('Success Actions', function () {
        beforeEach(function () {
            $this->user = User::find(1);
            $this->perPage = 15;
        });

        afterEach(function () {
            unset($this->user);
        });

        test('can view user', function () {
            $response = $this->actingAs($this->user)
                ->getJson(route('api.users.show', ['id' => $this->user->id]));

            $response->assertStatus(200)->assertSee($this->user->email);
        });

        test('can list all users', function () {
            $response = $this->actingAs($this->user)
                ->getJson(route('api.users.index', ['paginate' => false]));

            $response->assertStatus(200)->assertJsonCount(51, 'data');
        });

        test('can list paginated users', function () {
            $response = $this->actingAs($this->user)
                ->getJson(
                    route('api.users.index', [
                        'paginate' => true,
                        'page'     => 1,
                        'perPage'  => $this->perPage,
                    ])
                );

            $response->assertStatus(200);

            expect($response->getData()->status)->toBe(200)
                ->and($response->getData()->success)->toBeTrue()
                ->and($response->getData()->meta->currentPage)->toBeInt(1)
                ->and($response->getData()->meta->perPage)->toBeInt($this->perPage)
                ->and($response->getData()->meta->total)->toBeInt(51);
        });

        test('can create users', function () {
            $response = $this->actingAs($this->user)->postJson(route('api.users.store'), [
                'name'                  => 'New',
                'surname'               => 'Tester',
                'email'                 => 'new@tester.com',
                'phone'                 => '077998877662',
                'username'              => 'ntester',
                'password'              => 'N3wT35t',
                'password_confirmation' => 'N3wT35t',
                'email_verified_at'     => now(),
                'remember_token'        => Str::random(10),
                'countryId'             => 3,
                'roleId'                => 2,
                'gender'                => 'm',
            ])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(201);
        });

        test('can update users', function () {
            $response = $this->actingAs($this->user)
                ->patchJson(route('api.users.update', ['id' => 2]), [
                    'name'                  => 'Updated',
                    'email'                 => 'updated@tester.com',
                    'username'              => 'utester',
                    'password'              => 'Upda73dT35t',
                    'password_confirmation' => 'Upda73dT35t',
                ])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(200);
        });

        test('can delete users', function () {
            $updateUser = User::find(2);

            $response = $this->actingAs($this->user)->deleteJson(route('api.users.destroy', ['id' => $updateUser->id]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(200);
        });
    });

    describe('Fail Actions', function () {
        beforeEach(function () {
            $this->adminUser = User::find(1);
            $this->user = User::find(2);
        });

        afterEach(function () {
            unset($this->adminUser, $this->user);
        });

        test('cannot list users unauthenticated', function () {
            $response = $this
                ->getJson(route('api.users.index'))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot list users', function () {
            $response = $this->actingAs($this->user)
                ->getJson(route('api.users.index'))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(403);
        });

        test('cannot show users', function () {
            $response = $this->actingAs($this->user)
                ->getJson(route('api.users.show', ['id' => 3]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(403);
        });

        test('cannot show users unauthenticated', function () {
            $response = $this->getJson(route('api.users.show', ['id' => 3]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot show unknown users', function () {
            $response = $this->actingAs($this->adminUser)
                ->getJson(route('api.users.show', ['id' => 1000]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot create users', function () {
            $response = $this->actingAs($this->user)
                ->postJson(route('api.users.store'), [])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(403);
        });

        test('cannot create users unauthenticated', function () {
            $response = $this->postJson(route('api.users.store'), [])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot create users fails on data', function () {
            $response = $this->actingAs($this->adminUser)
                ->patchJson(route('api.users.store'), [
                    'name'   => null,
                    'email'  => 'updated-()-tester',
                    'gender' => 'u',
                ])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(405);
        });

        test('cannot create users fails on no data', function () {
            $response = $this->actingAs($this->adminUser)
                ->patchJson(route('api.users.store'))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(405);
        });

        test('cannot update users', function () {
            $response = $this->actingAs($this->user)
                ->patchJson(route('api.users.update', ['id' => 1]), [])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(403);
        });

        test('cannot update users unauthenticated', function () {
            $response = $this->patchJson(route('api.users.update', ['id' => 1]), [])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot update unknown user', function () {
            $response = $this->actingAs($this->adminUser)
                ->patchJson(route('api.users.update', ['id' => 1000]), [])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot update users fails on data', function () {
            $response = $this->actingAs($this->user)
                ->patchJson(route('api.users.update', ['id' => 2]), [
                    'name'   => null,
                    'email'  => 'updated-()-tester',
                    'gender' => 'u',
                ])
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(403);
        });

        test('cannot update users invalid unique key', function () {
            $response = $this->actingAs($this->user)
                ->patchJson(route('api.users.update', ['id' => 'test']))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(404);
        });

        test('cannot delete users', function () {
            $response = $this->actingAs($this->user)
                ->deleteJson(route('api.users.destroy', ['id' => 1]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(403);
        });

        test('cannot delete users unauthenticated', function () {
            $response = $this->deleteJson(route('api.users.destroy', ['id' => 1]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot delete unknown user', function () {
            $response = $this->actingAs($this->adminUser)
                ->deleteJson(route('api.users.destroy', ['id' => 1000]))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(400);
        });

        test('cannot delete users invalid unique key', function () {
            $response = $this->actingAs($this->adminUser)
                ->deleteJson(route('api.users.destroy', ['id' => 'test']))
                ->assertStatus(200);

            expect($response->getData()->status)->toBe(404);
        });
    });
});