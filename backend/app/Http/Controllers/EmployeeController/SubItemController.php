<?php

namespace App\Http\Controllers\EmployeeController;

use App\Http\Controllers\Controller;
use App\Models\SubItemModel;
use Illuminate\Http\Request;

class SubItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $data=SubItemModel::all();
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
            'item_id'=>'required|',
            'sub_item'=>'required|max:100',
            'rate'=>'required|max:10',
            'code'=>'required|max:50',
            'image_file'=>'required|mimes:jpeg,png,jpg,gif'
        ]);
        $data=new SubItemModel();
        $data->item_id=$request->item_id;
        $data->sub_item=$request->sub_item;
        $data->rate=$request->rate;
        $data->code=$request->code;
        if($request->has('image_file'))
        {
           $image= $request->file('image_file') ;
           $filename=time().'.'.$image->getClientOriginalExtension();
           $image->move('uploads/',$filename);
           $data->image=$filename;
        }
        $data->status=1;
        $data->save();
        return response()->json(['message'=>'done']);
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
            'id'=>'required|max:100',
            'sub_item'=>'required|max:256',
            'rate'=>'required|max:200',
            'code'=>'required|max:200'
        ]);

        $data=SubItemModel::where('id','=',$request->id)->first();
        $data->sub_item=$request->sub_item;
        $data->rate=$request->rate;
        $data->code=$request->code;
        $data->save();

        return response()->json(['message'=>'SubItem data updated successfully']);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validated=$request->validate(['id'=>'required']);
        SubItemModel::where('id','=',$request->id)->first()->delete();
         return response()->json(['message'=>'SubItem Data deleted successfully']);
    }
}
