<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = user::all();

        if ($users->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Resource data not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get all resources',
            'data' => $users
        ],200);
    }

    public function store(Request $request) {
        // Validator
        $validator = Validator ::make($request->all(), [
            'nik' => 'required|string|unique:users,nik',
            'nama_lengkap' => 'required|string|max:100',
            'no_telepon' => 'required|string|max:100',
            'password' => 'required|string'
        ]);

        // Check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // Insert data
        $users = User::create([
            'nik' => $request->nik,
            'nama_lengkap' => $request->nama_lengkap,
            'no_telepon' => $request->no_telepon,
            'password' => Hash::make($request->password)
        ]);

        // Response
        return response()->json([
            'success' => true,
            'message' => 'Resource created successfully',
            'data' => $users
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get resource by ID',
            'data' => $user
        ], 200);
    }

    public function update(string $id, Request $request)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
                'data' => []
            ], 404);
        }

        // Validator
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|unique:users,nik,' . $id,
            'nama_lengkap' => 'required|string|max:100',
            'no_telepon' => 'required|string|max:100',
            'password' => 'required|string'
        ]);

        // Check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // Siapkan data yang ingin di update
        $user->update([
            'nik' => $request->nik,
            'nama_lengkap' => $request->nama_lengkap,
            'no_telepon' => $request->no_telepon,
            'password' => Hash::make($request->password)
        ]);

        // Response
        return response()->json([
            'success' => true,
            'message' => 'Resource updated successfully',
            'data' => $user
        ], 200);
    }


    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
                'data' => []
            ], 404);
        }

        $user->delete();
        return response()->json([
            'success' => true,
            'message' => 'Resource deleted successfully',
            'data' => $user
        ], 200);
    }
}
