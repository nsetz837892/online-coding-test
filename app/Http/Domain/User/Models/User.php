<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Models;

use App\Http\Domain\Country\Models\Country;
use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\Role\DTO\RoleDTO;
use App\Http\Domain\User\Models\Contracts\UserInterface;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/**
 * User domain model
 *
 * @method static create(array $data)
 * @method static where(string $string, int $id)
 * @method static find(int $id)
 */
class User extends Authenticatable implements UserInterface
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable, HasRoles;

    /** @var string $factory Defines the user factory class */
    public static string $factory = UserFactory::class;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'username',
        'password',
        'country_id',
        'gender',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Custom attributes.
     *
     * @var list<string>
     */
    protected $appends = ['full_name'];

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return ucwords("{$this->getAttribute('name')} {$this->getAttribute('surname')}");
    }

    /**
     * Get the user's username.
     */
    public function username(): string
    {
        return $this->getAttribute('username');
    }

    /**
     * Get the user's email.
     */
    public function email(): string
    {
        return $this->getAttribute('email');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    /**
     * Get the Expense resources owned by this User resource.
     */
    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    /**
     * Get the Expense resources owned by this User resource.
     */
    public function getExpenses(): Collection
    {
        return $this->expenses()->get();
    }

    /**
     * Get the Country relationship owned by this User resource.
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the Country resource owned by this User resource.
     */
    public function getCountry(): Country
    {
        return $this->country()->take(1)->getModel();
    }

    /**
     * Get the Country model owned by this User resource.
     */
    public function getRole(): Model
    {
        return $this->getAttribute('roles')->first();
    }

    /**
     * Get a role DTO for the Role resource owned by this User resource.
     */
    public function getRoleResource(): RoleDTO
    {
        return RoleDTO::fromRole($this->getRole());
    }
}
