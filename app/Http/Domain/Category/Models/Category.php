<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Models;

use App\Http\Domain\Expense\Models\Expense;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Category is an expense category.
 */
class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    /** @var string $factory Defines the user factory class */
    public static string $factory = CategoryFactory::class;

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
    ];

    /**
     * Get the Expense relationship that owns this Category resource.
     */
    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}

