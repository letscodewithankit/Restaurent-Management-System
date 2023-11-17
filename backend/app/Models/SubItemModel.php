<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubItemModel extends Model
{
    use HasFactory;
protected $fillable=['image_file'];

    protected $table="sub_item";

    public function get_item_data()
    {
       return $this->belongsTo(ItemModel::class,'item_id');
    }
}
