<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function list_role(){
        $data = Role::get();

        $response['data'] = $data;
        $response['succes'] = true;
        return $response;
    }

    public function create(Request $request){
        try {
            $insert['name_lastname']= $request['name'];
            $insert['email']= $request['email'];
            $insert['city']= $request['city'];
            $insert['direction']= $request['address'];
            $insert['phone']= $request['phone'];
            $insert['rol']= $request['rol'];

            Employee::insert($insert);

            $response['message'] = 'Save successful';
            $response['succes'] = true;
            
        } catch (\Exception $e) {
           $response['message'] = $e->getMessage();
           $response['succes'] = false;
        }
        return $response;
    }

    public function list(){
        try {
            $data = Employee::with("role")->get();
            $response['data'] = $data;
            $response['message'] = 'Load successful';
            $response['succes'] = true;
        return $response;
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['succes'] = false;
        }
        return $response;
    }

    public function get($id){
      try {
          $data = Employee::with("role")->find($id);
          if($data){
            $response['data'] = $data;
            $response['message'] = 'Load successful';
            $response['succes'] = true;
          }else{
            $response['data'] = null;
            $response['message'] = 'Not found data id = '.$id;
            $response['succes'] = false;
          }
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['succes'] = false;
        }
        return $response;
    }

    public function update(Request $request, $id){
        try {
            $data['name_lastname']= $request['name'];
            $data['email']= $request['email'];
            $data['city']= $request['city'];
            $data['direction']= $request['address'];
            $data['phone']= $request['phone'];
            $data['rol']= $request['rol'];

            $res = Employee::where("id",$id)->update($data);

            $response['data'] = $res;
            $response['message'] = 'Update successful';
            $response['succes'] = true;

        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['succes'] = false;
        }
        return $response;
    }


    public function delete($id){
        try {
            $res = Employee::where("id",$id)->delete();
            $response['data'] = $res;
            $response['message'] = 'Delete successful';
            $response['succes'] = true;
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['succes'] = false;
        }
        return $response;
    }

    public function test (){
        //return redirect()->route('employee/edit/', [$id]);
       /* return redirect()->action(
            [EmployeeController::class, 'get'], ['id' => $id]
        );*/
        return view('employee')->with(['status' =>'ricardo',
                'richi'=>'mi nombre']);
        //return redirect()->route('employee_index',['status', 'Profile updated!']);
        /*JavaScript::put([
            'status' => 'Profile updated!',
        ]);
    
        return View::make('employee');*/
    }

}
