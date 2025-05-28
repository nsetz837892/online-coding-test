<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Models;

use App\Http\Domain\Category\Models\Category;
use App\Http\Domain\User\Models\User;
use Database\Factories\ExpenseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Expense is model for the Expense domain.
 */
class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory;

    /** @var string $factory Defines the expense factory class */
    public static string $factory = ExpenseFactory::class;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'description',
        'amount',
        'category_id',
        'date',
    ];

    /**
     * Get the User resources associated with
     * this Expense resource.
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the Category relation associated with
     * this Expense resource.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the Category resource associated with
     * this Expense resource.
     */
    public function getCategory(): Category
    {
        return $this->category;
    }
}
