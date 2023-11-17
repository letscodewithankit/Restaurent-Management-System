<?php

namespace App\Http\Controllers\EmployeeController;

use App\Http\Controllers\Controller;
use App\Models\ItemModel;
use App\Models\SubItemModel;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data=ItemModel::all();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated=$request->validate([
            'item'=>'required|max:100'
        ]);
        $data=new ItemModel();
        $data->item=$request->item;
        $data->status=1;
        $data->save();
        return response()->json(['message'=>'Item store successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated=$request->validate([
            'id'=>'required|max:50',
            'value'=>'required|max:100'
        ]);
        $data=ItemModel::where('id','=',$request->id)->first();
        $data->item=$request->value;
        $data->save();
        return response()->json('Item Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validated=$request->validate(['id'=>'required']);
       ItemModel::where('id','=',$request->id)->first()->delete();
       $data=SubItemModel::where('item_id','=',$request->id)->get();
        foreach ($data as $data2)
        {
            $data2->delete();
        }
        return response()->json(['message'=>'Item and their subItem deleted successfully']);
    }

    public function dummy(string $id)
    {
        $data=SubItemModel::where('item_id','=',$id)->get();
        foreach ($data as $data2)
        {
            $data2->delete();
        }
        return response($data);
    }

}
