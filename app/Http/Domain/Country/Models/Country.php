<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Models;

use App\Http\Domain\User\Models\User;
use Database\Factories\CountryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Country domain model.
 */
class Country extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    /** @var string $factory Defines the user factory class */
    public static string $factory = CountryFactory::class;

    /**
     * Disable timestamp columns.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'alpha_2_code',
    ];

    /**
     * Get the Expense resources that owns this Category resource.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}

