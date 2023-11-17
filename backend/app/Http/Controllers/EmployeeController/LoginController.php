<?php

namespace App\Http\Controllers\EmployeeController;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api',['except'=>['login','register']]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string',
        ]);

        $credencials=$request->only('email','password');

        $token=Auth::attempt($credencials);
        if (!$token)
        {
            return response()->json([
                'status'=>'error',
                'message'=>'Unauthorized'
            ],401);
        }

        $user=Auth::user();
        return response()->json([
            'status'=>'success',
            'user'=>$user,
            'authorization'=>[
                'token'=>$token,
                'type'=>'bearer',
            ]
        ]);
    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

}
