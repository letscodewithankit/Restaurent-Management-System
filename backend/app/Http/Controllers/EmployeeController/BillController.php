<?php

namespace App\Http\Controllers\EmployeeController;

use App\Http\Controllers\Controller;
use App\Models\Bill_details_Model;
use App\Models\BillModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $data2=new BillModel();
        $data4=BillModel::all();
        $data3= DB::table('bill_number')->latest('id')->first();

        if(count($data4)==0)
        {
            $data2->bill_number=111;
        }
        else
        {
            $num=$data3->bill_number;
            $data2->bill_number=$num+1;
        }

        $data2->total_amount=$request[1]['Total_amount'];
        $data2->status=1;
        $data2->save();
        $last_id=$data2->id;
        foreach ($request[0]['ItemData'] as $renderData)
        {
            $data=new Bill_details_Model();
            $data->sub_item_id=$renderData['id'];
            $data->bill_number_id=$last_id;
            $data->quantity=$renderData['quantity'];
            $data->amount=$renderData['amount'];
            $data->status=1;
            $data->save();
        }

        return response()->json("done");

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
