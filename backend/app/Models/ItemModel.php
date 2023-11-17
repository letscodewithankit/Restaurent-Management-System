<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemModel extends Model
{
    use HasFactory;
    protected $table="item";

    public function sub_item_data()
    {
        return $this->hasMany(SubItemModel::class,'item_id');
    }
}
