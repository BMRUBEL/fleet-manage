<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;
use SebastianBergmann\Environment\Console;

class Driver_controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Driver_model');
    }
    public function index()
    {
        $data = $this->Driver_model->list();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list' => $data, 'status' => true]));

    }


    public function adddriver()
    {
        // var_dump($_FILES);
        // exit;

        $name = $this->input->post('name');
        $email = $this->input->post('email');
        $password = $this->input->post('password');
        // $role = $this->input->post('role');
        $phone = $this->input->post('phone');
        $age = $this->input->post('age');
        $license_no = $this->input->post('license_no');
        $license_expire_date = $this->input->post('license_expire_date');
        $experience = $this->input->post('experience');
        $joining_date = $this->input->post('joining_date');
        $reference = $this->input->post('reference');
        $address = $this->input->post('address');
        $status = $this->input->post('status');


        $config['upload_path'] = './uploads';
        $config['allowed_types'] = 'gif|jpg|png|pdf';
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $data1='';
        if (!$this->upload->do_upload('photo')) {
            $error = array('error' => $this->upload->display_errors());
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $error, 'status' => false]));
        } else {
            // $data = array('upload_data' => $this->upload->data());
            $photo = $this->upload->data();
            $data1 = $photo['file_name'];
        } 
        
            // $config['upload_path'] = './uploads';
            // $config['allowed_types'] = 'gif|jpg|png|pdf';
            // $this->load->library('upload', $config);
            // $this->upload->initialize($config);

        $data='';
        if (!$this->upload->do_upload('documents')) {
            $error = array('error' => $this->upload->display_errors());
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $error, 'status' => false]));
        } else {
            // $document = array('upload_data' => $this->upload->data());
            $documents = $this->upload->data();
            $data = $documents['file_name'];
        }
        

         $this->Driver_model->saveuser($data1, $name, $email, $password,$phone, $age, $license_no, $license_expire_date, $experience, $joining_date, $reference, $address, $status, $data);




        // $data=json_decode(file_get_contents("php://input"),true);
        // $data['password']=md5($data['password']);
        // $header = apache_request_headers();
        // $token=$header['Authorization'];
        // // try{
        //     $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
        //     $d=$this->Driver_model->saveuser($data);
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
        // }catch(ExpiredException $e){
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        // }catch(SignatureInvalidException $s){
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        // }catch(Exception $ex){
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        // }
    }
    public function deletedriver()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Driver_model->deletedriver($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully deleted!', 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function editdriver()
    {
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Driver_model->editdrive($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['user' => $d, 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function updatedriver()
    {
        $id=$this->input->post('id');
        $name = $this->input->post('name');
        $email = $this->input->post('email');
        $password = $this->input->post('password');
        // $role = $this->input->post('role');
        $phone = $this->input->post('phone');
        $age = $this->input->post('age');
        $license_no = $this->input->post('license_no');
        $license_expire_date = $this->input->post('license_expire_date');
        $experience = $this->input->post('experience');
        $joining_date = $this->input->post('joining_date');
        $reference = $this->input->post('reference');
        $address = $this->input->post('address');
        $status = $this->input->post('status');
        


        $config['upload_path'] = './uploads';
        $config['allowed_types'] = 'gif|jpg|png|pdf';
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $data1='';        
        if (!$this->upload->do_upload('photo')) {
            $error = array('error' => $this->upload->display_errors());
        //    print_r($error);
        } else {
            // $data = array('upload_data' => $this->upload->data());
            $photo = $this->upload->data();
            $data1 = $photo['file_name'];
        } 
        $data='';
        if (!$this->upload->do_upload('documents')) {
            $error = array('error' => $this->upload->display_errors());
            
        } else {
            // $document = array('upload_data' => $this->upload->data());
            $documents = $this->upload->data();
            $data = $documents['file_name'];
        }      
        $this->Driver_model->update_driver($data1, $name, $email, $password,$phone, $age, $license_no, $license_expire_date, $experience, $joining_date, $reference, $address, $status, $data,$id);
        // var_dump($data1);
        
       
    
        
        

        //  $this->Driver_model->update_driver($data1, $name, $email, $password, $role, $phone, $age, $license_no, $license_expire_date, $experience, $joining_date, $reference, $address, $status, $data,$id);



        // $header = apache_request_headers();
        // $token = $header['Authorization'];
        // try {
        //     $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
        //     // Your section starts here
        //     $data = json_decode(file_get_contents("php://input"), true);
        //     $data['password'] = md5($data['password']);
        //     $this->Driver_model->update_driver($data);
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Updated!', 'status' => true]));
        //     // Your section ends here
        // } catch (ExpiredException $e) {
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        // } catch (SignatureInvalidException $s) {
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        // } catch (Exception $ex) {
        //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        // }
    }
  


    // public function file()
    // {
    //     $config['upload_path'] = './uploads';
    //     $config['allowed_types'] = 'gif|jpg|png|pdf';

    //     $this->load->library('upload', $config);
    //     $this->upload->initialize($config);
    //     if (!$this->upload->do_upload('photo')) {
    //         $error = array('error' => $this->upload->display_errors());
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $error, 'status' => false]));


    //     } else {
    //         $data = array('upload_data' => $this->upload->data());
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $data, 'status' => true]));


    //     }
    // }

    public function driverlist()
    { 
            $data = $this->Driver_model->driver_list();
            $this->output->set_content_type('application/json')->set_output(json_encode(['driver' => $data, 'status' => true]));
            //  var_dump($data);
        
    }

    public function driver_Details()
    {
        
        // $header = apache_request_headers();
        // $token=$header['Authorization'];
        try{
            // $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=[];
            if($data['startDate']!=''){
                $std=date_create($data['startDate']);
                $etd=date_create($data['endDate']);
                $int=new DateInterval('P1D');
                $rang=new DatePeriod($std,$int,$etd);
                foreach($rang as $r){
                    $t=$this->Driver_model->get_driverdetails($data['driverid'],$r->format('Y-m-d'));
                    if ($t!=null) {
                        $d[]=$t;
                    }
                }
            }else{
                $std=date_create(date('Y-m'.'-01'));
                $etd=date_create(date('Y-m-d'));
                $int=new DateInterval('P1D');
                $rang=new DatePeriod($std,$int,$etd);
                foreach($rang as $r){
                    $t=$this->Driver_model->get_driverdetails($data['driverid'],$r->format('Y-m-d'));
                    if ($t!=null) {
                        $d[]=$t;
                    }
                }                  
            }

            $this->output->set_content_type('application/json')->set_output(json_encode(['driverdetails'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
}

?>